const companyService = require("../services/company.service");
const {
  getData,
  createOrUpdateData,
  excelDateToJSDate,
} = require("../utils/functions");
const xlsxPopulate = require("xlsx-populate");
module.exports = {
  async index(req, res) {
    const response = await companyService.resolvePromisesForCompanies();
    return res.status(200).send({ companies: response });
  },

  async indexOne(req, res) {
    const { id } = req.params;

    try {
      const company = await companyService.resolvePromisesForCompanies(id);

      if (!company) {
        throw new Error("Não tem companhia na lista com esse id");
      }

      return res.status(200).json({ company: company });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
  async create(req, res) {
    const { name, age, employees, owner, state } = req.body;
    const companies = getData("company.json");

    if (!name || !age || !employees || !owner || !state) {
      return res
        .status(400)
        .send({ message: "É obrigatório preencher todos os campos." });
    }
    const id = companies.length + 1;

    const createNewCompany = [
      ...companies,
      {
        id: id,
        name: name,
        age: age,
        employees: employees,
        owner: owner,
        state: state,
      },
    ];

    createOrUpdateData("company.json", createNewCompany);

    return res.status(200).send({ message: "Empresa criada com sucesso." });
  },
  async importUsers(req, res) {
    const xlsBuffer = req.file.buffer;
    const xlsxData = await xlsxPopulate.fromDataAsync(xlsBuffer);
    const rows = xlsxData.sheet(0).usedRange().value();
    const [firstRow] = rows;
    const keys = ["price", "typesOfExpenses", "date", "name"];
    const existAllKeys = firstRow.every((item, index) => {
      return keys[index] === item;
    });

    if (!existAllKeys || firstRow.length !== 4) {
      return res.status(400).send({
        message: "É necessário enviar todos os campos e escritos corretamente",
      });
    }

    const companies = getData("company.json");
    rows.shift();
    const array = [];

    rows.map((row) => {
      const result = row.map((cell, index) => {
        const keyAndValue = { [firstRow[index]]: cell };
        array.push(keyAndValue);
        return array;
      });

      return array;
    });
    // const objectUser = Object.assign({ id: companies.length + 1 }, ...result);

    console.log(array);

    const newArray = array.map((item) => {
      if (Object.keys(item) === price) {
        excelDateToJSDate(Object.value(item));
      }
      console.log(newArray);
    });
    return res.status(200).send({ message: "Usuários salvos com sucesso" });
  },
};
