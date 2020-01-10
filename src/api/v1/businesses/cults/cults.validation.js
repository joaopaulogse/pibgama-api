const Joi = require("joi");

module.exports = {
    createGroup: {
        body: Joi.object()
            .keys({
                name: Joi.string(),
                date: Joi.date()
                    .iso()
                    .required(),
                note: Joi.string(),
                count: Joi.number().required(),
                type: Joi.string()
                    .allow(["HOPE", "HYPE", "CELEBRAÇÃO", "TADEL", "EVENTOS"])
                    .required()
            })
            .required()
    },
    updateGroup: {
        body: Joi.object().keys({
            name: Joi.string(),
            date: Joi.date().iso(),
            note: Joi.string(),
            count: Joi.number(),
            type: Joi.string().allow([
                "HOPE",
                "HYPE",
                "CELEBRAÇÃO",
                "TADEL",
                "EVENTOS"
            ])
        })
    }
};
