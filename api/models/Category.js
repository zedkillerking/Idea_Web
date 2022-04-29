const mongoose = require("mongoose");

// work in progress

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 1,
      max: 50,
      unique: true,
    },
    desc: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
