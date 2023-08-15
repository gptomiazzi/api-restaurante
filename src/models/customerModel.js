const conn = require('./connection');

const getAll = async () => {
  const [customers] = await conn.execute('SELECT * FROM cliente');

  return customers;
};

const createCustomer = async (customer) => {

  const { nome, cpf, telefone, email } = customer;

  const [createdCustomer] = await conn.execute('INSERT INTO cliente (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)', [nome, cpf, telefone, email]);

  return { message: `Cliente cadastrado com o ID: ${createdCustomer.insertId}` };
};

const deleteCustomer = async (id) => {
  const deletedCustomer = await conn.execute('DELETE FROM cliente WHERE id = ?', [id]);

  return deletedCustomer;
};

module.exports = {
  getAll,
  createCustomer,
  deleteCustomer
};