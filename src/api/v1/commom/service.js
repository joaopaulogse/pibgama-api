const mongoose = require("mongoose");
const _ = require("lodash");
const { NotFound } = require("../utils/errors");
const HttpStatus = require("http-status");
const email = require("./email");
const logger = require("../../../config/log.config");
const Token = require("../utils/token");

class Service {
    constructor(model) {
        this.model = mongoose.model(model);
        this.email = email;
        this.httpStatus = HttpStatus;
        this.logger = logger;
        this.optionsDefault = {
            select: "",
            query: {},
            sort: {},
            populate: ""
        };
    }

    async verify(field, payload, options = this.optionsDefault) {
        try {
            const doc = await this.model
                .findOne({
                    [field]: payload,
                    ...options.query
                })
                .select(options.select);
            if (_.isEmpty(doc)) {
                throw new NotFound();
            } else {
                return doc;
            }
        } catch (error) {
            throw error;
        }
    }

    async _create(payload) {
        try {
            return await new this.model(payload).save();
        } catch (error) {
            throw error;
        }
    }

    async _update(_id, payload, options = this.optionsDefault) {
        try {
            return await this.model
                .findOneAndUpdate(
                    {
                        _id
                    },
                    {
                        $set: {
                            ...payload
                        }
                    },
                    {
                        new: true
                    }
                )
                .select(options.select);
        } catch (error) {
            throw error;
        }
    }

    async _find(query = {}, options = this.optionsDefault) {
        try {
            return await this.model.find(query).populate(options.populate).sort(options.sort);
        } catch (error) {
            throw error;
        }
    }

    async _findOne(query = {}) {
        try {
            return await this.model.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async _signToken(payload, options = "7d") {
        return Token.generateToken(payload, options);
    }

    async verifyToken(token) {
        return Token.verifyToken(token);
    }

    async _remove(id) {
        try {
            return await this.model.deleteOne({_id: id});
        } catch (error) {
            throw error;
        }
    }

    async _delete(conditions) {
        try {
            return await this.model.deleteMany(conditions);
        } catch (error) {
            throw error;
        }
    }

    async findPaginated(query, options) {
        return await this.model.paginate(query, options);
    }
}

module.exports = Service;
