const BaseController = require("../base-controller");
// const _ = require("lodash");
// const { NotAuthorized } = require("../../utils/errors");
// const { readFileSync } = require("fs");

class GroupsController extends BaseController {
    constructor(){
        super("groups");
    }

    async findAll(req, res, next) {
        try {
            let options = {
                populate: "leaders auxLeaders members parent",
            };
            const docs = await this._find(req.query, options);
            res.status(this.httpStatus.OK).json(docs);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GroupsController;
