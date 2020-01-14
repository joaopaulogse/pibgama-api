const Joi = require("joi");

module.exports = {
    createUser: {
        body: Joi.object()
            .keys({
                email: Joi.string().email(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                genre: Joi.string()
                    .allow(["MALE", "FEMALE"])
                    .required(),
                username: Joi.string()
            })
            .required()
    },
    createPassword: {
        body: {
            id: Joi.string().allow(null, ""),
            password: Joi.string()
                .min(6)
                .max(20)
                .required()
        }
    },
    auth: {
        body: Joi.object()
            .keys({
                login: Joi.string().required(),
                password: Joi.string()
                    .min(6)
                    .max(20)
                    .required()
            })
            .required()
    },
    access: {
        body: Joi.object()
            .keys({
                _id: Joi.string().required(),
                role: Joi.string().allow(["ADMIN", "USER"]).required(),
            })
            .required()
    },
    updateUser: {
        body: Joi.object().keys({
            username: Joi.string(),
            nickname: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email(),
            genre: Joi.string().allow(["MALE", "FEMALE"]),
            birthdate: Joi.date().iso(),
            cpf: Joi.string().allow("", null),
            phone: Joi.alternatives().try([
                Joi.array().items({
                    type: Joi.string().allow(
                        "RESIDENTIAL",
                        "COMMERCIAL",
                        "CELL-PHONE",
                        null,
                        ""
                    ),
                    number: Joi.string()
                }),
                Joi.object().keys({
                    type: Joi.string().allow(
                        "RESIDENTIAL",
                        "COMMERCIAL",
                        "CELL-PHONE",
                        null,
                        ""
                    ),
                    number: Joi.string()
                })
            ]),
            role: Joi.string().allow(["ADMIN", "USER"]),
            baptized: Joi.boolean(),
            memberType: Joi.string().allow([
                "MEMBER",
                "VISITOR",
                "FREQUENTER",
                "OFF"
            ]),
            dateTicket: Joi.date().iso()
        })
    }
};
