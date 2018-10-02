const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { NotFound } = require("../utils/errors");

class Service {
    constructor(model = mongoose.model()){
        this.model = model;
        this.optionsDefault = {
            select: "",
            query:{}
        };
    }

    async verify(field, payload, options = this.optionsDefault){
        try {
            const doc = await this.model.findOne({
                [field]: payload,
                ...options.query
            }).select(options.select);
            if(_.isEmpty(doc)){
                throw new NotFound();
            }else{
                return doc;
            }
        } catch (error) {
            throw error;
        }
    }

    async _create(payload){
        try {
            return await new this.model(payload).save();
        } catch (error) {
            throw error;
        }
    }

    async _update(_id, payload, options = this.optionsDefault){
        try {
            return await this.model.findOneAndUpdate({
                _id
            }, {
                $set: {
                    ...payload
                }
            }, {
                new: true
            }).select(options.select);
        } catch (error) {
            throw error;
        }
    }

    async _find(query = {}){
        try {
            return await this.model.find(query);
        } catch (error) {
            throw error;
        }
    }

    async _findOne(query = {}){
        try {
            return await this.model.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    _signToken(payload, options = {}){
        try{
            return jwt.sign(payload, process.env.SECRET_TOKEN || "JAJAIIA", {
                expiresIn: "24h",
                ...options
            });
        } catch (error) {
            throw error;
        }
    }

    async verifyToken(token) {
        try {
            const verify = await jwt.verify(token, process.env.SECRET_TOKEN);
            return verify;
        } catch(error) {
            throw error;
        }
    }

    async _remove(id){
        try {
            return await this.model.delete(id);
        } catch (error) {
            throw error;
        }
    }



    async findPaginated(query, options) {
        return await this.model.paginate(query, options);
    }
}

module.exports = Service;
