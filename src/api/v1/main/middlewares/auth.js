const { controller: UserController } = require("../../businesses/users");
const userController = new UserController();
const HttpStatus = require("http-status");
const _ = require("lodash");
const allowURL = [
    {
        url: "/users",
        method: "POST"
    },
    {
        url: "/users/auth",
        method: "POST"
    },
    {
        url: "/users/pass",
        method: "POST"
    },
    {
        url: "/addresses/",
        method: "GET"
    },
    {
        url: "/users/createPassword",
        method: "GET"
    }
];

const verifyURL = (path, method) => {
    return true;
    // allowURL.map((paths) => {
    //     return (_.startsWith(path, paths.url) && paths.method === method);
    // }).includes(true);
};

module.exports = async (error, req, res, next) => {
    try {
        if(verifyURL(req.path, req.method)){
            console.log("passo aqui ?");
            return next(error);
        } else {
            const token = req.headers["x-access-token"] || req.body.token || req.query.token;
            if(token){
                req.user = await userController.verifyToken(token);
                return next();
            }else{
                throw new Error("Token no provider");
            }
        }

    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: error.message || "Token no provider",
            status: "error"
        });
    }
};
