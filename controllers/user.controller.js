const UserService = require('../services/user.service');
const ResponseHelper = require('../helpers/apiResponse')

exports.index = async function (req, res) {
    try {
        const users = await UserService.index();
        //console.log(users.length);
        res
            .status(200)
            .json({status: 'Success', msg: 'Users List', data: users})
    } catch (err) {
        res
            .status(500)
            .json({msg: err.message})
    }
}

exports.save = async function (req, res) {
    const result = await UserService.save(req);
    ResponseHelper.renderResponse(res, result);
}

exports.edit = function (req, res, next) {}

exports.update = function (req, res, next) {}

exports.delete = function (req, res, next) {}