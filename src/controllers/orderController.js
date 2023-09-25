const orderModel = require('../models/orderModel');

const getAll = async (_req, res) => {
  const orders = await orderModel.getAll();

  return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  const createdOrder = await orderModel.createOrder(req.body);

  return res.status(201).json(createdOrder);
};

const addItem = async (req, res) => {
  const addedItem = await orderModel.addItem(req.body);

  return res.status(201).json(addedItem);
};

const closeOrder = async (req, res) => {
  const paidOrder = await orderModel.closeOrder(req.body);

  return res.status(200).json(paidOrder);
};

module.exports = {
  getAll,
  createOrder,
  addItem,
  closeOrder
};