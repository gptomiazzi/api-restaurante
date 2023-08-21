const customerModel = require('../models/customerModel');

const getAll = async (_req, res) => {
  const customers = await customerModel.getAll();

  return res.status(200).json(customers);
};

const createCustomer = async (req, res) => {
  const createdCustomer = await customerModel.createCustomer(req.body);

  return res.status(201).json(createdCustomer);
};

module.exports = {
  getAll,
  createCustomer,

};