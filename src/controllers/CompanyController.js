const companyService = require("../services/company.service");
const {
  getData,
  createOrUpdateData,
  excelDateToJSDate,
  parseData,
  removeDuplicatedFromArray,
} = require("../utils/functions");
const xlsxPopulate = require("xlsx-populate");
const parse = require("nodemon/lib/cli/parse");
module.exports = {
  /* async index(req, res) {
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
  }, */

  async importUsers(req, res) {
    const { id } = req.params;
    // #swagger.tags = ['Companies']
    // #swagger.description = 'Endpoint para adicionar informações dos gastos de um determinado usuário via arquivo do tipo xlsx, é necessário que as células da primeira linha do arquivo estejam escritas como: célula A1 -> price, célula B1 -> typesOfExpenses, célula C1 -> date, célula D1 -> name.'
    /* #swagger.parameters['xlsxfile'] = { 
      in:'body',
      '@schema' : {
        "required" : ["name"],
        "properties" : {
          "price": {
            "type":"number",
            "example": "3500"
          },
          "typesOfExpenses":{
            "type":"string",
            "example": "Shopping"
          },
          "date": {
            "type":"date",
            "example": "04/01/2022"
          },
          "name": {
            "type":"string",
            "example": "first buy"
          },
        }
      }
    }
    */
    const userData = await companyService.getUserById(id);
    console.log(userData.financialData);
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
    rows.map((row) => {
      const result = row.map((cell, index) => {
        return { [firstRow[index]]: cell };
      });
      const objectUser = Object.assign(
        { financialId: userData.financialData.length + 1 },
        ...result
      );

      objectUser.date = excelDateToJSDate(objectUser.date);

      console.log(objectUser);
      userData.financialData.push(objectUser);
      return userData;
    });
    console.log(userData);

    const total = userData.financialData
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);

    if (typeof total !== "number") {
      return res.status(400).send({
        message:
          "É necessário que as células da coluna preço sejam apenas números",
      });
    }

    const companyUpdate = companies.map((item) => {
      if (item.id === Number(id)) {
        return { ...item, ...userData };
      }
      return { ...item };
    });

    createOrUpdateData("company.json", companyUpdate);

    return res.status(200).send({ message: "Usuários salvos com sucesso" });
  },

  async deleteFinancialId(req, res) {
    const { userid, financialid } = req.params;
    // #swagger.tags = ['Companies']
    // #swagger.description = 'Endpoint para deletar determinado gasto do usuário a partir do id do usuário e id do gasto, é necessário enviar os dois ids via parâmetro da requisição.'

    const companies = getData("company.json");
    const findUser = companies.find((item) => item.userId === Number(userid));
    //console.log(findUser);
    if (!findUser) {
      return res
        .status(400)
        .send({ message: "Não foi possível deletar os dados." });
    }

    const removeFinancialId = findUser.financialData.filter(
      (item) => item.financialId !== Number(financialid)
    );
    if (!removeFinancialId) {
      return res
        .status(400)
        .send({ message: "Não foi possível deletar os dados." });
    }

    findUser.financialData = removeFinancialId;

    const updateFinancialData = companies.map((item) => {
      if (item.userId === Number(userid)) {
        return { ...parseData(item, findUser) };
      } else {
        return { ...item };
      }
    });

    createOrUpdateData("company.json", updateFinancialData);

    return res.status(200).send({ message: "dados deletados com sucesso" });
  },

  async getValueFinancesByMonthAndYear(req, res) {
    // #swagger.tags = ['Companies']
    // #swagger.description = 'Endpoint para resgatar informações dos gastos mensais e anuais de determinado usuário,também é possível filtrar o total de determinado tipo de gasto via query'
    const { userid } = req.params;
    const companies = getData("company.json");
    const findUser = companies.find((item) => item.userId === Number(userid));
    if (!findUser) {
      return res
        .status(400)
        .send({ message: "Não foi realizar a coleta dos dados." });
    }
    const years = [];
    const months = [];
    //console.log(findUser.financialData);
    findUser.financialData.map((item) => {
      const arrayOfDates = item.date.split("-");
      years.push(arrayOfDates[0]);
      months.push(arrayOfDates[1]);
      //console.log(arrayOfDates);
    });
    const newYears = removeDuplicatedFromArray(years);
    const newMonths = removeDuplicatedFromArray(months);
    console.log(newYears, newMonths);

    findUser.financialData.map((item) => {
      const arrayOfDates = item.date.split("-");
    });

    return res.status(200).send({ message: "dados coletados com sucesso" });
  },
};
