const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    categoryId: {
        type: String,
        required: true,
      },
    title: {
      type: String,
      max: 50,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
       default: "idea/Hide yo pain Harold.png",
    },
    docsUrls: {
      type: Array,
      default: []
    },
    likes: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", IdeaSchema);
