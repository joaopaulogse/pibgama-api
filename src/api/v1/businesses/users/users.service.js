const Service = require("../../commom/service");
const email = require("../../commom/email");
const User = require("./users.model");
const _ = require("lodash");
const { readFileSync } = require("fs");

const { NotAuthorized } = require("../../utils/errors");

class UserService extends Service {
    constructor(){
        super(User);
        this.email = email;
    }

    async createUser(body){
        try {
            const user = await this._create(body);
            const url = `${process.env.URL_API}/createPassword?token=${this._signToken({ id: user._id })}`
            await this.email.send({
                to: user.email,
                from: process.env.EMAIL_TRANSACTIONAL,
                subject: "Seja bem vindo a PIBGama",
                html: readFileSync(`${__dirname}/../../../../../templates/mailTemplates/Welcome.html`).toString(),
                substitutions:{
                    "firstName": user.firstName,
                    "url": url,
                },

            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createPassword({ id, password}){
        try {
            const user = await this.verify("_id", id, { select: "+password" });
            if(!_.isEmpty(user.password)){
                throw new NotAuthorized("This user have password");
            }else{
                user.password = password;
                return await user.save();
            }
        } catch (error) {
            throw error;
        }
    }

    async authentication({login, password}){
        try {
            return await this.auth(login, password);
        } catch (error) {
            throw error;
        }
    }

    async auth(field, password){
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
                const token = await this.tokenAuth(user);
                const userChanged = await this._update(user.id, { authToken: token });
                return { user: userChanged, token };
            }else{
                throw new NotAuthorized();
            }
        } catch (error) {
            throw error;
        }
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

    async updateUser(user, body){
        try {
            body = {
                ...body,
                location: !_.isEmpty(body.location) ? [body.location.lat, body.location.lng] : undefined,
            };
            return await this._update(user.id, body, {
                select:"-authToken"
            });
        } catch (error) {
            throw error;
        }
    }

    async findUser(id){
        try {
            return await this.verify("_id", id, {
                select: "-authToken"
            });

        } catch (error) {
            throw error;
        }
    }

    async delete(userId, userWho){
        try {
            const user = await this.verify("_id", userId);
            return await user.delete(userWho.id);
        } catch (error) {
            throw error;
        }
    }
    async restore(userId){
        try {
            await this.model.restore({_id: userId});
            const user = await this.verify("_id", userId, {
                select: "-authToken"
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
