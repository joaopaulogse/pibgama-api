const winston = require('winston');
const { createLogger, format, transports } = winston;
const {  timestamp } = format;


const log = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            name: 'info-console',
        }),
        new transports.Console({
            level: 'error',
            name: 'error-console',
        })
    ],
    exitOnError: false,
    format: winston.format.combine(
        timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
    )
});

module.exports = log;
