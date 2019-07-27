const Joi = require("joi");

module.exports = {
    createGroup: {
        body: Joi.object()
            .keys({
                name: Joi.string().required(),
                creationDate: Joi.date()
                    .iso()
                    .required(),
                host: Joi.string().required(),
                leaders: Joi.array().items(Joi.string().required()).max(2),
                type: Joi.string()
                    .allow(["SMALL", "SECTOR", "AREA", "NETWORK", "DISTRICT"])
                    .required(),
                dayOfTheWeek: Joi.string()
                    .allow([
                        "SUNDAY",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY"
                    ])
                    .required(),
            })
            .required()
    },
    updateGroup: {
        body: Joi.object().keys({
            username: Joi.string(),
            nickname: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email(),
            genre: Joi.string().allow(["MALE", "FEMALE"]),
            birthdate: Joi.date().iso(),
            cpf: Joi.string(),
            phone: {
                type: Joi.string().allow([
                    "RESIDENTIAL",
                    "COMMERCIAL",
                    "CELL-PHONE"
                ]),
                number: Joi.string()
            },
            location: {
                lng: Joi.string(),
                lat: Joi.string()
            },
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
