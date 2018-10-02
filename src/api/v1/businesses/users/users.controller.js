const UserService = require("./users.service");
const userService = new UserService();
const HttpStatus = require("http-status");

const logger = require("../../../../config/log.config");

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.createPassword = async (req, res) => {
    try {
        await userService.createPassword(req.body);
        return res.status(HttpStatus.OK).json({
            status: "success"
        });
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.auth = async (req, res) => {
    try {
        const { token } = await userService.authentication(req.body);
        return res.status(HttpStatus.OK).json({
            status: "success",
            token
        });
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        let { sort, limit, page, search } = req.query;
        search = new RegExp(search, "i");
        let query = {
            $or:[
                { email: search },
                { username: search },
                { firstName: search },
                { lastName: search }
            ]
        };
        let options = {
            sort: sort ? sort : "createdAt",
            limit: limit ? limit : 10,
            page: page ? page : 1,
        };
        const users = await userService.findPaginated(query, options);
        return res.status(HttpStatus.OK).json(users);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user, req.body);
        return res.status(HttpStatus.OK).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.findUser(req.params.id);
        return res.status(HttpStatus.OK).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.user = async (req, res) => {
    return res.redirect(`/v1/users/${req.user.id}`);
};

exports.delete = async (req, res) => {
    try {
        const user = await userService.delete(req.params.id, req.user);
        return res.status(HttpStatus.OK).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};
exports.restore = async (req, res) => {
    try {
        const user = await userService.restore(req.params.id);
        return res.status(HttpStatus.OK).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(error.httpStatus || HttpStatus.BAD_REQUEST).json({
            code: error.code,
            message: error.message,
            status: 'error'
        });
    }
};

exports.viewCreatePassword = async (req, res) =>{
    res.render("createPassword", { id : 1 });
};
