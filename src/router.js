const express = require('express');
const router = express.Router();

const customerController = require('./controllers/customerController');
const employeeController = require('./controllers/employeeController');

// Clientes
router.get('/customer', customerController.getAll);
router.post('/customer', customerController.createCustomer);

//Funcionários
router.get('/employee', employeeController.getAll);
router.post('/employee', employeeController.createEmployee);

module.exports = router;