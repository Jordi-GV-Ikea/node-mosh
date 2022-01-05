const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required()
  });
  return schema.validate({ name: customer });
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
