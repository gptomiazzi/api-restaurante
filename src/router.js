const express = require('express');
const router = express.Router();

const customerController = require('./controllers/customerController');
const employeeController = require('./controllers/employeeController');
const productController = require('./controllers/productController');

//Clientes
router.get('/customer', customerController.getAll);
router.post('/customer', customerController.createCustomer);

//Funcionários
router.get('/employee', employeeController.getAll);
router.post('/employee', employeeController.createEmployee);

//Produtos
router.get('/product', productController.getAll);
router.post('/product', productController.createProduct);

module.exports = router;