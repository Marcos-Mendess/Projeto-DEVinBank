const express = require("express");
const companiesRoutes = express.Router();
const companyController = require("../../controllers/companyController");
const multer = require("multer");
const upload = multer();

companiesRoutes.get(
  "/v1/companies/finance/:userid",
  companyController.getValueFinancesByMonthAndYear
);
companiesRoutes.post(
  "/v1/companies/:id",
  upload.single("file"),
  companyController.importUsers
);
companiesRoutes.delete(
  "/v1/company/finance/:userid/:financialid",
  companyController.deleteFinancialId
);

module.exports = companiesRoutes;
