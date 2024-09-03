const express = require("express");
const { bookcontrol } = require("../Controller");
const { MasterBookSchema } = require("../Models");
const { increment_alphanumeric_str } = require("../common/count");
const { createBook } = require("../Helpers/validation");
const route = express.Router();
const validation = require("../Helpers/validation");
const { verifyAccessToken } = require("../Helpers/jwthelper");
//create
route.post("/create", async (req, res) => {
  try {
    const book = await MasterBookSchema.find().sort({
      _id: -1,
    }).lean()
    if (book && book.length) {
      let BookId = book[0].BookId;
      req.body.BookId = increment_alphanumeric_str(BookId);
    }
    let result = await createBook.validateAsync(req.body);
    let saveBook = await bookcontrol.create(req.body);
    res.send(saveBook);
  } catch (error) {
    let errObj = {
      status: 1001,
    };
    if (error.isJoi === true) errObj.message = error.details[0].message;
    else errObj.message = "Something went wrong";
    res.send(errObj);
  }
});
//update
route.post("/update", async (req, res) => {
  let body = req.body;
  let result = await bookcontrol.update(body);
  res.send(result);
});
//delete
route.post("/delete", async (req, res) => {
  let id = req.body.BookId;
  let result = await bookcontrol.delete(id);
  res.send(result);
});
//list
route.get("/list", async (req, res) => {
  try {
    let result = await bookcontrol.list();
    res.send(result);
  } catch (error) {
    let errObj = {
      status: 1001,
    };
    if (error.isJoi === true) errObj.message = error.details[0].message;
    else errObj.message = "Something went wrong";
    res.send(errObj);
  }
});
//details
route.post("/details", async (req, res) => {
  let id = req.body.BookId;
  let result = await bookcontrol.details(id);
  res.send(result);
});

module.exports = route;
