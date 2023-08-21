const employeeModel = require('../models/employeeModel');

const getAll = async (_req, res) => {
  const employees = await employeeModel.getAll();

  return res.status(200).json(employees);
};

const createEmployee = async (req, res) => {
  const createdEmployee = await employeeModel.createEmployee(req.body);

  return res.status(201).json(createdEmployee);
};

module.exports = {
  getAll,
  createEmployee
};