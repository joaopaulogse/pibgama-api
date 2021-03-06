const BaseController = require("../base-controller");
const _ = require("lodash");
const { NotAuthorized } = require("../../utils/errors");
const { readFileSync } = require("fs");
class UserController extends BaseController {
    constructor(){
        super("users");
    }

    tokenAuth(user){
        try {
            return this._signToken({
                id: user._id,
                role: user.role,
                email: user.email
            });
        } catch (error) {
            throw error;
        }
    }

    async getUserLogged(req, res, next){
        try {
            const response = await this.verify('_id', req.user.id);
            return res.status(this.httpStatus.OK).json(response);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next){
        try {
            const user = await this._create(req.body);

            return res.status(this.httpStatus.CREATED).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async plataformAccess(req, res, next) {
        try {
            const user = await this.verify("_id", req.body._id, { select: "+password" });
            if(!_.isEmpty(user.password)){
                throw new NotAuthorized("This user have password");
            }else {
                user.role = req.body.role;
                await user.save();

                const token = await this._signToken({ id: user._id }, "1d");
                console.log(token);
                const url = `${process.env.URL_API_CREATE_PASSWORD}?token=${token}`;
                await this.email.send({
                    to: user.email,
                    from: process.env.EMAIL_TRANSACTIONAL,
                    subject: "Seja bem vindo a PIBGama",
                    html: readFileSync(`${__dirname}/../../../../../templates/mailTemplates/Welcome.html`).toString(),
                    substitutions:{
                        "firstName": user.firstName,
                        "url": url,
                    }
                });
                return res.status(this.httpStatus.OK).json({
                    url,
                    _id:  user._id
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    async createPassword(req, res, next){
        try {
            const { password } = req.body;
            const user = await this.verify("_id", req.body.id || req.user.id, { select: "+password" });
            if(!_.isEmpty(user.password)){
                throw new NotAuthorized("This user have password");
            }else{
                await this._update(req.body.id || req.user.id, { emailVerified: true });
                user.password = password;
                await user.save();
            }
            return res.status(this.httpStatus.OK).json({
                status: "success"
            });
        } catch (error) {
            return next(error);
        }
    }

    async authentication(req, res, next){
        try {
            const { login, password } = req.body;
            const response = await this._auth(login, password);
            return res.status(this.httpStatus.OK).json(response);
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next){
        try {
            const body = {
                ...req.body
            };
            const response = await this._update(req.params.id, body, {
                select:"-authToken"
            });
            res.status(this.httpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    }

    async _auth(field, password){
        try {
            const user = await this.model.findOne({
                $or:[
                    { email: field },
                    { username: field },
                    { cpf: field }
                ]
            }).select("+password");
            if(_.isEmpty(user.password)){
                throw new NotAuthorized("Password not createad");
            }
            if(user.validPassword(password)){
                user.password = undefined;
                const token = await this.tokenAuth(user);
                return { user, token };
            }else{
                throw new NotAuthorized("Invalid Password");
            }
        } catch (error) {
            throw error;
        }
    }

    async renderPagePassword(token){
        try {
            if(!_.isEmpty(token)){
                const { id } = await this.verifyToken(token);
                const user = await this.verify("_id", id);
                return await this.renderPage("resetPassword", { user }, { title : "Create password"});
            } else {
                throw new Error("Token is required");
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserController;
