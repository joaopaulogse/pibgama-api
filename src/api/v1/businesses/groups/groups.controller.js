const BaseController = require("../base-controller");
// const _ = require("lodash");
// const { NotAuthorized } = require("../../utils/errors");
// const { readFileSync } = require("fs");

class GroupsController extends BaseController {
    constructor(){
        super("groups");
    }
}

module.exports = GroupsController;
