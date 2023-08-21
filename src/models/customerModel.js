const conn = require('./connection');

const getAll = async () => {
  const [customers] = await conn.execute('SELECT * FROM cliente');

  return customers;
};

const createCustomer = async (customer) => {

  const { nome, cpf, telefone, email } = customer;

  const sqlQuery = 'INSERT INTO cliente (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)';

  const [createdCustomer] = await conn.execute(sqlQuery, [nome, cpf, telefone, email]);

  return { message: `Cliente cadastrado com o ID: ${createdCustomer.insertId}` };
};


module.exports = {
  getAll,
  createCustomer
};