const express = require("express");
const Router = express.Router();
const { errorValidation, errorDefault } = require("../middlewares/errors");
const auth = require("../middlewares/auth");
const { routes: RoutesUser } = require("../../businesses/users");
const { routes: RoutesAddress } = require("../../businesses/addresses");

Router.use(auth);

Router.use("/users", RoutesUser);
Router.use("/addresses", RoutesAddress);

Router.use(errorDefault);
Router.use(errorValidation);

module.exports = Router;
