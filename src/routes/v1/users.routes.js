const express = require("express");
const usersRoutes = express.Router();
const userController = require("../../controllers/UserController");

usersRoutes.get("/v1/user/:id", userController.indexOne);
usersRoutes.post("/v1/user", userController.create);
usersRoutes.patch("/v1/user/:id", userController.updateOne);

module.exports = usersRoutes;
