const Joi = require("joi");

module.exports = {
    createUser: {
        body: Joi.object().keys({
            email: Joi.string().email(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            genre: Joi.string().allow(["MALE", "FEMALE"]).required(),
            username: Joi.string()
        }).required()
    },
    createPassword: {
        body: Joi.object().keys({
            id: Joi.string().required(),
            password: Joi.string().min(6).max(20).required()
        }).required()
    },
    auth: {
        body: Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().min(6).max(20).required()
        }).required()
    },
    updateUser: {
        body: Joi.object().keys({
            username:Joi.string(),
            nickname: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email(),
            genre:Joi.string().allow(["MALE", "FEMALE"]),
            birthdate: Joi.date().iso(),
            cpf: Joi.string(),
            phone: {
                type: Joi.string().allow(["RESIDENTIAL", "COMMERCIAL", "CELL-PHONE"]),
                number: Joi.string()
            },
            location:{
                lng: Joi.string(),
                lat: Joi.string()
            },
            role: Joi.string().allow(["ADMIN", "USER"]),
            baptized: Joi.boolean(),
            memberType:Joi.string().allow(["MEMBER", "VISITOR", "FREQUENTER", "OFF"]),
            dateTicket: Joi.date().iso()
        })
    }
};
