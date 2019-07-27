const express = require("express");
const routesV1 = require("../api/v1/main/routes");
const { error404 } = require("../api/v1/main/middlewares/errors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("./mongodb");
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));

app.use(cors());
app.use("/docs", express.static("docs"));
app.use("/public", express.static("public"));

app.use("/v1", routesV1);

app.use(error404);


module.exports = app;
