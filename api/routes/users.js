const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:updateId", async (req, res) => {
  // if (req.body.role=="admin") {
    if (req.body.userPassword) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.updateId, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  // } else {
  //   return res.status(403).json("You can update only your account!");
  // }
});

//delete user
router.delete("/:deleteId", async (req, res) => {
  // if (req.body.role=="admin") {
    try {
      await User.findByIdAndDelete(req.params.deleteId);
      res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  // }
  // else {
  //   return res.status(403).json("You have no permission to delete users!");
  // }
});

//get a user
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;
//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// get all users
router.get("/allUsers", async (req, res) => {
  try {
    const filter = {};
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
})
router.get("/getUsername/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user.username);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
