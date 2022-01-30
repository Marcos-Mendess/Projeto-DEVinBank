// Instanciando o framework
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
// Atribuindo a uma constante para utilizar suas funções por meio dos seus métodos
const app = express();

const routes = require("./routes");

// Configurando para aceitar json nos métodos do tipo POST ou UPDATE
app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => console.log("Executando"));
