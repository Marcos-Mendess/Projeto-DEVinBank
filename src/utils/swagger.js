const swaggerAutoGen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/server.js"];

const doc = {
  info: {
    title: "DEVinBank Pagamentos",
    description: "Endpoints da aplicação DEVinBank Pagamentos",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Development server",
      templates: {
        scheme: {
          enum: ["http", "https"],
          default: "https",
        },
      },
    },
  ],
};

swaggerAutoGen(outputFile, endpointsFiles, doc);
