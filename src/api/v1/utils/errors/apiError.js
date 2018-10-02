
class ApiError extends Error {
    constructor(message, code, httpStatus){
        super(message);
        this.code = code;
        this.httpStatus = httpStatus;
        this.apiError = true;
    }
}

module.exports = ApiError;
