const Service = require("../commom/service");

class BaseController extends Service {
    constructor(model){
        super(model);
    }

    async create(req, res, next){
        try {
            const doc = await this._create(req.body);
            res.status(this.httpStatus.CREATED).json(doc);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next){
        try {
            const newDoc = await this._update(req.params.id, req.body);
            res.status(this.httpStatus.OK).json(newDoc);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const docs = await this._find(req.query);
            res.status(this.httpStatus.OK).json(docs);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req, res, next) {
        try {
            const doc = await this._findOne({
                _id: req.params.id,
                ...req.query
            });
            res.status(this.httpStatus.OK).json(doc);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next){
        try {
            const doc = await this._remove(req.params.id);
            res.status(this.httpStatus.OK).json(doc);
        } catch (error) {
            next(error);
        }
    }

    async deleteLogic(req, res, next){
        try {
            const doc = await this.verify("_id", req.params.id);
            const response = await doc.delete(req.user.id);
            return res.status(this.httpStatus.OK).json(response);
        } catch (error) {
            return next(error);
        }
    }

    async restore(req, res, next){
        try {
            await this.model.restore({_id: req.params.id});
            const doc = await this.verify("_id", req.user.id, {
                select: "-authToken"
            });
            return res.status(this.httpStatus.OK).json(doc);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = BaseController;
