const conn = require('./connection');

const getProductionReport = async (params) => {
  const { date } = params;

  const [productionReport] = await conn.execute('SELECT * FROM pedido WHERE data_pedido = ?', [date]);

  return productionReport;
};

module.exports = {
  getProductionReport
};