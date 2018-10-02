const validator = require("express-validation");
const HttpStatus = require("http-status");

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
        res.status(HttpStatus.BAD_REQUEST).json({
            message: this.handlerErrors(err.errors)
        });
    }else{
        next();
    }
};

const error404 = (req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: "Not found"
    });
};



module.exports = {
    error404,
    errorValidation
};
