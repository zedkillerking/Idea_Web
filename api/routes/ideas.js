const router = require("express").Router();
const multer = require("multer");
const Idea = require("../models/Idea");

// work in progress
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/idea");
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
  }
});
const upload = multer({storage: storage});
//create a category
router.post("/add", async (req, res) => {
  const newIdea = new Idea({
    posterId: req.body.posterId,
    title: req.body.title,
    desc: req.body.desc,
    categoryId: req.body.categoryId,
  });
  try {
    const savedIdea = await newIdea.save()
    res.status(200).json(savedIdea);
  } catch (err) {
    res.status(500).json(err);
  }
});
// change files
router.put("/changeIdeaFiles/:ideaId", upload.array("ideaDocs", 6), async (req, res, next) => {
    const  docsUrls= []
    for (var i = 0; i < req.files.length; i++) {
      docsUrls.push(req.files[i].filename)
  }
    const body = {
      docsUrls: docsUrls,
    };
    try {
      const idea = await Idea.findById(req.params.ideaId);
    // if (req.body.role === "admin") {
      await idea.updateOne({ $set: body });
      res.status(200).json("The files has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  });
// router.post("/add", upload.array("ideaDocs", 6), async (req, res, next) => {
//   const  docsUrls= []
//   for (var i = 0; i < req.files.length; i++) {
//     docsUrls.push(req.files[i].filename)
// }
//   const newIdea = new Idea({
//     posterId: req.body.posterId,
//     title: req.body.title,
//     desc: req.body.desc,
//     categoryId: req.body.categoryId,
//     docsUrls: docsUrls,
//   });
//   try {
//     const savedIdea = await newIdea.save();
//     res.status(200).json(savedIdea);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//update a category

// router.put("/:id", async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (req.body.role === "admin") {
//       await category.updateOne({ $set: req.body });
//       res.status(200).json("The category has been updated");
//     } else {
//       res.status(403).json("You don't have permission to this operation");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//delete a category

// router.delete("/:id", async (req, res) => {
//   try {
//     const category = await Category.findById(req.params._id);
//     if (req.body.role === "admin") {
//       await category.deleteOne();
//       res.status(200).json("The category has been deleted");
//     } else {
//       res.status(403).json("You don't have permission to delete categories");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//get a category

// router.get("/:id", async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.status(200).json(category);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get  all ideas

router.get("/allIdeas", async (req, res) => {
  try {
    const filter = {};
    const ideas = await Idea.find(filter);
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/like/:ideaId", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
    if (!idea.likes.includes(req.body.userId)) {
      await idea.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await idea.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/like/:ideaId", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
    // return the like button color depending on whether user liked this idea or not
    if (!idea.likes.includes(req.body.userId)) {
      res.status(200).json("#39ac73");
    } else {
      res.status(200).json("#206040");

    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/comment/:ideaId", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
      await idea.updateOne({ $push: { comment: {
        commenterId: req.body.userId,
        comment: req.body.commentContent} } });
      res.status(200).json("comment sent");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
