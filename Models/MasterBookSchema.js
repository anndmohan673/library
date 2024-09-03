const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const addBook = new Schema(
  {
    BookId: {
      type: String,
      default: "B001",
    },
    Title: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    Edition: {
      type: String,
      required: true,
    },
    DateOfPublishing: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MasterBookSchema",
  addBook,
  "MasterBookSchema"
);
