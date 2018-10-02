const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const logger = require("./log.config");

const switchCase = {
    "dev": `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_DATABASE}`,
    "docker": `mongodb://mongo:${process.env.DB_PORT || "27017"}/${process.env.DB_DATABASE}`,
    "production": `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_DATABASE}`,
    "test": `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_DATABASE}`,
};

mongoose.connect(switchCase[process.env.NODE_ENV], {
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connection.on("open", ()=>{
    logger.info("Connection database");
});
mongoose.connection.on("error", (error)=>{
    logger.error(error);
});
