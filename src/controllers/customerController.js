const customerModel = require('../models/customerModel');

const getAll = async (_req, res) => {
  const customers = await customerModel.getAll();

  return res.status(200).json(customers);
};

const createCustomer = async (req, res) => {
  const createdCustomer = await customerModel.createCustomer(req.body);

  return res.status(201).json(createdCustomer);
};

const deleteCustomer = async(req, res) => {
  const { id } = req.params;

  await customerModel.deleteCustomer(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  createCustomer,
  deleteCustomer
};