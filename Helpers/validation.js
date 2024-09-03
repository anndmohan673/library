const Joi = require("joi");

module.exports = {
  createBook: Joi.object({
    BookId: Joi.string().required(),
    Title: Joi.string().required(),
    Author: Joi.string().required(),
    ISBN: Joi.string().required(),
    Edition: Joi.string().required(),
    DateOfPublishing: Joi.string().required(),
    Status: Joi.boolean().required(),
  }),
  createUser: Joi.object({
    PhoneNumber: Joi.string().required(),
    Password: Joi.string().min(3).required(),
  }),
};
