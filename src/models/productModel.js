const conn = require ('./connection');

const getAll = async () => {
  const [products] = await conn.execute('SELECT * FROM produto');

  return products;
};

const createProduct = async (product) => {
  const { nome, valor } = product;

  const sqlQuery = 'INSERT INTO produto (nome, valor) VALUES (?, ?)';

  const [createdProduct] = await conn.execute(sqlQuery, [nome, valor]);

  return { message: `Produto cadastrado com o ID: ${createdProduct.insertId}` };

};

module.exports = {
  getAll,
  createProduct
};