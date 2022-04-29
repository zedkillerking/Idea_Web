const mongoose = require("mongoose");

// work in progress

const CloseDateSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      require: true,
      unique: true,
    },
    openDate: {
      type: Date,
      require,
    },
    commentCloseDate: {
        type: Date,
        require,
    },
    postCloseDate: {
        type: Date,
        require,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CloseDate", CloseDateSchema);
