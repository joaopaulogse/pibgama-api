const express = require("express");
const Router = express.Router();
const { errorValidation, errorDefault } = require("../middlewares/errors");
const auth = require("../middlewares/auth");
const { routes: RoutesUser } = require("../../businesses/users");
const { routes: RoutesAddress } = require("../../businesses/addresses");
const { routes: RoutesGroups } = require("../../businesses/groups");
const { routes: RouterCults } = require("../../businesses/cults");

Router.use(auth);

Router.use("/users", RoutesUser);
Router.use("/addresses", RoutesAddress);
Router.use("/groups", RoutesGroups);
Router.use("/cults", RouterCults);

Router.use(errorValidation);
Router.use(errorDefault);

module.exports = Router;
