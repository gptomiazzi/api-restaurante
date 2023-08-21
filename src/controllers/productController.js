const productModel = require('../models/productModel');

const getAll = async (_req, res) => {
  const products = await productModel.getAll();

  return res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const createdProduct = await productModel.createProduct(req.body);

  return res.status(201).json(createdProduct);
};

module.exports = {
  getAll,
  createProduct
};