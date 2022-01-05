const express = require("express");
const router = express.Router();
const morgan = require("morgan");
router.use(morgan("tiny"));
const {Customer, validateCustomer} = require ('../models/customer');
//const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer doesn't exists");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body.name);
  if (error) return res.status(400).send("Error with customer");

  let customer = await new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body.name);
  if (error) return res.status(400).send("Error with customer");

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );

  if (!customer) return res.status(404).send("customer doesn't exists");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  console.log("id:", req.params.id);
  const customer = await Customer.findOneAndRemove({ _id: req.params.id });
  if (!customer) return res.status(404).send("customer doesn't exists");
  res.send(customer);
});

module.exports = router;
