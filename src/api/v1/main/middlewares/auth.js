const Token = require("../../utils/token");
const HttpStatus = require("http-status");
const _ = require("lodash");
const allowURL = [
    {
        url: "/users/auth",
        method: "POST"
    },
    {
        url: "/users",
        method: "POST"
    },
    {
        url: "/addresses/",
        method: "GET"
    },
];

const verifyURL = (path, method) => {
    return allowURL.map((paths) => {
        return (_.startsWith(path, paths.url) && paths.method === method);
    }).includes(true);
};

module.exports = async (req, res, next) => {
    try {
        if(verifyURL(req.path, req.method)){
            return next();
        } else {
            let token = req.headers["authorization"];
            if(token){
                token = token.replace('Bearer ', '');
                req.user = await Token.verifyToken(token);
                req.user.token = token;
                return next();
            }else{
                throw new Error("Token no provider");
            }
        }

    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: error.message || "Token no provider",
            status: "error"
        });
    }
};
