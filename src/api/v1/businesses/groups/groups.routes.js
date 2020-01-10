const express = require("express");
const validate = require("express-validation");

const Router = express.Router();

const Controller = require("./groups.controller");
const controller = new Controller();
const validationUser = require("./groups.validation");

Router
    .route("/")
    .post(validate(validationUser.createGroup), controller.create.bind(controller))
    .get(controller.findAll.bind(controller));

Router
    .route("/:id")
    .put(validate(validationUser.updateGroup), controller.update.bind(controller))
    .get(controller.findOne.bind(controller))
    .delete(controller.delete.bind(controller));

module.exports = Router;
