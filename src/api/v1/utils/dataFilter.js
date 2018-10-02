
exports.getPaginateOptions = function (params, def) {
    let { page, limit, sort } = params;
    return {
        page: page || 1,
        limit: limit * 1 || 10,
        sort: {
            [sort || def && def.sort || 'createdAt' ]: sort ? 1: -1
        }
    };
};

exports.makeQuery = function (labels) {
    return function (search) {
        return search ? {
            $or: labels.map(function (label) {
                return {
                    [label]: { $regex: new RegExp(search, 'ig') }
                };
            })
        } : {};
    };
};
