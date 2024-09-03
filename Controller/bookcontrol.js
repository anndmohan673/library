const { MasterBookSchema } = require("../Models");
// exporting the
module.exports = {
  create: async (doc) => {
    try {
      let book = new MasterBookSchema(doc);
      let saveBook = await book.save();
      return {
        status: 1000,
        message: "Book Added Succesfully",
        data: saveBook,
      };
    } catch (error) {
      let errObj = {
        status: 1001,
        message: "Something went wrong",
      };
      return errObj;
    }
  },

  update: async (doc) => {
    let updateBook = await MasterBookSchema.findOneAndUpdate(
      { BookId: doc.BookId },
      { $set: doc },
      { new: true, upsert: true }
    );
    return {
      status: 1000,
      message: "BookDetails updated successfully",
      data: updateBook,
    };
  },

  delete: async (id) => {
    let book = await MasterBookSchema.deleteOne({ BookId: id });
    return {
      status: 1000,
      message: "Book deleted successfully",
      data: book,
    };
  },

  list: async () => {
    try {
      let bookList = await MasterBookSchema.find({}, { _id: 0 });
      return {
        status: 1000,
        message: "Book list fetched successfully",
        data: bookList,
      };
    } catch (error) {
      let errObj = {
        status: 1001,
        message: "Something went wrong",
      };
      return errObj;
    }
  },

    details: async (id) => {
      let book = await MasterBookSchema.find({BookId : id});
      return {
        status: 1000,
        message: "Book details fetched successfully",
        data: book
      }
  },
};
