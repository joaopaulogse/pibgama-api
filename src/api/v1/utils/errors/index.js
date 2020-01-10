const ApiError = require("./apiError");
const HttpStatus = require("http-status");

class NotAuthorized extends ApiError {
    constructor(message = "Not Authorized"){
        super(message, "001", HttpStatus.UNAUTHORIZED);
    }
}

class ValidationError extends ApiError {
    constructor(message = "Validation Error"){
        super(message, "002", HttpStatus.BAD_REQUEST);
    }
}

class NotFound extends ApiError {
    constructor(message = "Not Found"){
        super(message, "004", HttpStatus.NOT_FOUND);
    }
}


module.exports = {
    NotAuthorized,
    NotFound,
    ValidationError
};
