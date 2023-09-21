const express = require('express');
const router = express.Router();

const customerController = require('./controllers/customerController');
const employeeController = require('./controllers/employeeController');
const productController = require('./controllers/productController');
const authMiddleware = require('./middleware/auth');

//Login
router.post('/login', authMiddleware.loginAuth);

//Clientes
router.get('/viewCustomers', authMiddleware.verifyJWT, customerController.getAll);
router.post('/createCustomer', authMiddleware.verifyJWT, customerController.createCustomer);

//Funcionários
router.get('/viewEmployees', authMiddleware.verifyJWT, employeeController.getAll);
router.post('/createEmployee', authMiddleware.verifyJWT, employeeController.createEmployee);

//Produtos
router.get('/viewProducts', authMiddleware.verifyJWT, productController.getAll);
router.post('/createProduct', authMiddleware.verifyJWT, productController.createProduct);

module.exports = router;