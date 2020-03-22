const UserService = require('../services/user.service');

exports.index = async function (req, res, next) {
    try {
        const users = await User.find({})
        //console.log(users.length);
        res
            .status(200)
            .json(users)
    } catch (err) {
        res
            .status(500)
            .json({message: err.message})
    }
}

exports.save = async function (req, res, next) {
    const result = await UserService.save(req, res)
    if (result) {
        if (result.status == 'failure') {
            res
                .status(400)
                .json({msg: result})
        } else {
            res
                .status(200)
                .json({msg: result})
        }
    } else {
        res
            .status(500)
            .json({msg: 'Internal Error!'})
    }
}

exports.edit = function (req, res, next) {}

exports.update = function (req, res, next) {}

exports.delete = function (req, res, next) {}