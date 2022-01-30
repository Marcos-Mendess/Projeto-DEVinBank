const { getData, createOrUpdateData } = require("../utils/functions");
const userService = require("../services/user.service");

module.exports = {
  async indexOne(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para retornar informações sobre determinado usuário, é necessário enviar o parâmetro id via url.'
    /* #swagger.parameters['id'] = { 
      "parameters":{
            "in": "path",
            "required": true,
            "type": "string"
          }
    }
    */
    const { id } = req.params;
    try {
      const response = await userService.getUserById(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    const { name, email } = req.body;
    // #swagger.tags = ['Users']
    // #swagger.auto = false;
    // #swagger.description = 'Endpoint para criar usuário, é necessário enviar o nome e e-mail do novo usuário.'
    /* #swagger.parameters['obj'] = { 
      in:'body',
      '@schema' : {
        "required" : ["name"],
        "properties" : {
          "name": {
            "type":"string",
            "example": "João"
          },
          "email": {
            "type":"string",
            "example": "joao@madeira.com"
          }
        }
      }
    }
    */
    console.log(req.body);
    if (!name || name == null) {
      return res
        .status(400)
        .send({ message: "É necessário enviar o nome do usuário" });
    }

    if (!email || email == null) {
      return res
        .status(400)
        .send({ message: "É necessário enviar o email do usuário" });
    }

    const users = getData("user.json");
    const createNewUser = [
      ...users,
      {
        id: users.length + 1,
        name: name,
        email: email,
      },
    ];
    createOrUpdateData("user.json", createNewUser);
    return res.status(200).send({ message: "Usuário salvo com sucesso." });
  },

  async updateOne(req, res) {
    const { id } = req.params;
    // #swagger.tags = ['Users']
    // #swagger.auto = false;
    // #swagger.description = 'Endpoint para atualizar determinado usuário a partir do id, é necessário enviar o id via parâmetro da requisição e  o nome e e-mail do novo usuário em um json, caso algum campo não requisitado seja adicionado no json retornará um erro.'
    /* #swagger.parameters['id'] = { 
            "in": "path",
            "required": true,
            "type": "string"
    }
    */
    /* #swagger.parameters['obj'] = { 
      in:'body',
      '@schema' : {
        "required" : ["name"],
        "properties" : {
          "name": {
            "type":"string",
            "example": "João"
          },
          "email": {
            "type":"string",
            "example": "joao@madeira.com"
          }
        }
      }
    }
    */

    const users = getData("user.json");

    const existUser = users.find((item) => item.id === Number(id));

    const { name, email } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ message: "É necessário enviar o novo nome do usuário" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ message: "É necessário enviar o novo email do usuário" });
    }

    if (!existUser) {
      return res.status(400).send({ message: "Não houve mudança de dados" });
    }

    const validation = req.body;
    delete validation.name;
    delete validation.email;

    const rangeOfNewObject = Object.entries(validation);
    if (rangeOfNewObject.length > 0) {
      return res.status(400).send({
        message: `Os campos a seguir não existem : ${Object.keys(validation)}`,
      });
    }

    const dataForUpdate = req.body;

    const updateUsersList = users.map((item) => {
      if (item.id === Number(id)) {
        return { ...item, ...dataForUpdate };
      } else {
        return { ...item };
      }
    });
    createOrUpdateData("user.json", updateUsersList);
    return res.status(200).send({ message: "Usuário atualizado com sucesso." });
  },
};
