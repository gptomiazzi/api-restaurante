const express = require('express');
const router = express.Router();

const customerController = require('./controllers/customerController');

router.get('/customer', customerController.getAll);
router.post('/customer', customerController.createCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;