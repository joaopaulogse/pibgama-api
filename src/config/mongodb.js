const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const logger = require("./log.config");


async function setupDatabase() {
    let uri = process.env.DB_URL;
    logger.info(`Database: ${uri}`);
    mongoose.connect(uri, {
        useNewUrlParser: true,
    });
    mongoose.set('debug', true);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    mongoose.connection.on("open", () => {
        logger.info("Connection database");
    });
    mongoose.connection.on("error", error => {
        logger.error(error);
    });
}
module.exports = {
    setupDatabase
};
