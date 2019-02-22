const express = require("express");
const validate = require("express-validation");

const Router = express.Router();

const Controller = require("./users.controller");
const controller = new Controller();
const validationUser = require("./users.validation");

// Router.get("/createPassword", controler.viewCreatePassword);
Router
    .route("/")
    .post(validate(validationUser.createUser), controller.create.bind(controller))
    .get(controller.findAll.bind(controller));

Router
    .route("/:id")
    .put(validate(validationUser.updateUser), controller.update.bind(controller))
    .get(controller.findOne.bind(controller))
    .delete(controller.deleteLogic.bind(controller));

Router
    .put("/restore/:id", controller.restore.bind(controller));

Router
    .get("/me", controller.getUserLogged.bind(controller));
Router
    .post("/pass", validate(validationUser.createPassword), controller.createPassword.bind(controller));
Router
    .post("/auth", validate(validationUser.auth), controller.authentication.bind(controller));



module.exports = Router;
