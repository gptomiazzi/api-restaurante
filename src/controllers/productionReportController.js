const productionReportModel = require('../models/productionReportModel');

const getProductionReport = async (req, res) => {
  const productionReport = await productionReportModel.getProductionReport(req.body);

  return res.status(200).json(productionReport);
};

module.exports = {
  getProductionReport
};