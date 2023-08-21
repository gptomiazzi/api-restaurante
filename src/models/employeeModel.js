const conn = require('./connection');

const getAll = async () => {
  const [employees] = await conn.execute('SELECT * FROM funcionario');

  return employees;
};

const createEmployee = async (employee) => {
  const { nome, cpf, cargo, salario, data_nascimento } = employee;

  const dateUTC = new Date(Date.now()).toUTCString();

  const sqlQuery = 'INSERT INTO funcionario (nome, cpf, cargo, salario, data_admissao, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)';

  const [createdEmployee] = await conn.execute(sqlQuery, [nome, cpf, cargo, salario, dateUTC, data_nascimento]);

  return { message: `Funcionário cadastrado com o ID: ${createdEmployee.insertId}` };

};

module.exports = {
  getAll,
  createEmployee
};