const express = require("express");
const validate = require("express-validation");

const Router = express.Router();

const controler = require("./users.controller");
const validationUser = require("./users.validation");

Router.get("/createPassword", controler.viewCreatePassword);
Router.get("/", controler.getAll);
Router.post("/", validate(validationUser.createUser), controler.createUser);
Router.put("/:id", validate(validationUser.updateUser), controler.updateUser);
Router.get("/me", controler.user);
Router.get("/:id", controler.getUser);
Router.delete("/:id", controler.delete);
Router.put("/restore/:id", controler.restore);
Router.post("/pass", validate(validationUser.createPassword), controler.createPassword);
Router.post("/auth", validate(validationUser.auth), controler.auth);



module.exports = Router;
