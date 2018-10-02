const express = require("express");
const routesV1 = require("../api/v1/main/routes");
const { error404 } = require("../api/v1/main/middlewares/errors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const reactViews = require("express-react-views");

const app = express();

require("./mongodb");

app.use(morgan("combined"));

app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));

app.use("/docs", express.static("docs"));

app.use("/v1", routesV1);

app.use(error404);

module.exports = app;
