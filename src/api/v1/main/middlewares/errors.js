const validator = require("express-validation");
const HttpStatus = require("http-status");
const logger = require("../../../../config/log.config");
/**
 * Manipula os erros enviados pelo Joi
 * para que sejam enviado somente as mensagens
 * @param errors
 */
exports.handlerErrors = (errors) =>{
    return errors.map(({ field, messages }) => ({ field, messages: messages.map(message => message.replace(/[^a-zA-Z0-9 ]/g, "")) }) );
};

exports.handlerErrorsJoiValidateMessage = (errors) =>{
    return errors.map(({ path, message }) => ({ path, message: message.replace(/[^a-zA-Z0-9 ]/g, "") }));
};

const errorValidation = (err, req, res, next) => {
    if(err instanceof validator.ValidationError){
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: this.handlerErrors(err.errors),
            status: "error",
            code: "002"
        });
    }else{
        if(err){
            return next(err);
        } else {
            return next();
        }
    }
};

const error404 = (req, res) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: "Not found"
    });
};

const errorDefault = (error, req, res, next) => {
    if(error){
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }else{
        return next();
    }
};


module.exports = {
    error404,
    errorValidation,
    errorDefault
};
