const Joi = require("joi");

module.exports = {
    createGroup: {
        body: Joi.object()
            .keys({
                name: Joi.string().required(),
                creationDate: Joi.date()
                    .iso()
                    .required(),
                host: Joi.string(),
                leaders: Joi.array()
                    .items(Joi.string().required())
                    .max(3),
                type: Joi.string()
                    .allow(["SMALL", "SECTOR", "AREA", "NETWORK", "DISTRICT"])
                    .required(),
                parent: Joi.string(),
                hour: Joi.date().iso(),
                auxLeaders: Joi.array().items(Joi.string()),
                members: Joi.array().items(Joi.string()),
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
                    .required()
            })
            .required()
    },
    updateGroup: {
        body: Joi.object().keys({
            name: Joi.string(),
            type: Joi.string().allow(
                "SMALL",
                "SECTOR",
                "AREA",
                "NETWORK",
                "DISTRICT"
            ),
            creationDate: Joi.date().iso(),
            dayOfTheWeek: Joi.string().allow(
                "SUNDAY",
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY"
            ),
            hour: Joi.date().iso(),
            host: Joi.string(),
            parent: Joi.string(),
            leaders: Joi.array().items(Joi.string()),
            auxLeaders: Joi.array().items(Joi.string()),
            members: Joi.array().items(Joi.string())
        })
    }
};
