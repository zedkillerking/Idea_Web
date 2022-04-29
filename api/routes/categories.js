const router = require("express").Router();
const Category = require("../models/Category");

// work in progress

//create a category

router.post("/add", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    desc: req.body.desc,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a category

router.put("/:updateId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.updateId);
    // if (req.body.role === "admin") {
      await category.updateOne({ $set: req.body });
      res.status(200).json("The category has been updated");
    // } else {
    //   res.status(403).json("You don't have permission to this operation");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a category

router.delete("/:deleteId", async (req, res) => {
  // if (req.body.role==="admin") {
    try {
      await Category.findByIdAndDelete(req.params.deleteId);
      res.status(200).json("Category has been deleted");
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

//get  all categories

router.get("/allCategories", async (req, res) => {
  try {
    const filter = {};
    const categories = await Category.find(filter);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
