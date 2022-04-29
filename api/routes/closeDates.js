const CloseDate = require("../models/CloseDate");
const router = require("express").Router();

// work in progress

//create a category

router.post("/add", async (req, res) => {
  const newCloseDate = new CloseDate({
    year: req.body.year,
    openDate: req.body.openDate,
    commentCloseDate: req.body.commentCloseDate,
    postCloseDate: req.body.postCloseDate,
  });
  try {
    const savedCloseDate = await newCloseDate.save();
    res.status(200).json(savedCloseDate);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a closeDate

router.put("/:updateId", async (req, res) => {
  try {
    const closeDate = await CloseDate.findById(req.params.updateId);
    // if (req.body.role === "admin") {
      await closeDate.updateOne({ $set: req.body });
      res.status(200).json("The close date has been updated");
    // } else {
    //   res.status(403).json("You don't have permission to this operation");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a category

router.delete("/:deleteId", async (req, res) => {
  // if (req.body.role=="admin") {
    try {
      await CloseDate.findByIdAndDelete(req.params.deleteId);
      res.status(200).json("Close date has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  // }
  // else {
  //   return res.status(403).json("You have no permission to delete categories!");
  // }
});
//get a category

// router.get("/:id", async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.status(200).json(category);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get  all closeDates

router.get("/allCloseDates", async (req, res) => {
  try {
    const filter = {};
    const closeDates = await CloseDate.find(filter);
    res.status(200).json(closeDates);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
