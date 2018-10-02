const express = require("express");

const Router = express.Router();

const controler = require("./addresses.controller");

Router.get("/:cep", controler.search);


module.exports = Router;
