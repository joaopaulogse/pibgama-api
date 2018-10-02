const http = require("http");
const app = require("./src/config/express");
const server = http.createServer(app);

const logger = require("./src/config/log.config");


server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    logger.info(`Server running ${server.address().address}:${server.address().port}`);
});

module.exports = server;
