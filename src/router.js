const express = require('express');
const router = express.Router();

const customerController = require('./controllers/customerController');
const employeeController = require('./controllers/employeeController');
const productController = require('./controllers/productController');
const tokenController = require('./controllers/tokenController');
const auth = require('./middleware/auth');

//Login
router.post('/login', tokenController.loginAuth);

//Logout
router.delete('/logout', tokenController.logout);

//Gerar novo token
router.post('/token', tokenController.verifyTokenExpiration);

//text
router.get('/test', auth.verifyJWT, (_req, res) => res.status(200).json({ message: 'ok' }));

//Clientes
router.get('/viewCustomers', auth.verifyJWT, customerController.getAll);
router.post('/createCustomer', auth.verifyJWT, customerController.createCustomer);

//Funcionários
router.get('/viewEmployees', auth.verifyJWT, employeeController.getAll);
router.post('/createEmployee', auth.verifyJWT, employeeController.createEmployee);

//Produtos
router.get('/viewProducts', auth.verifyJWT, productController.getAll);
router.post('/createProduct', auth.verifyJWT, productController.createProduct);

module.exports = router;