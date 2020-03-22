const AuthService = require('../services/auth.service');
const authService = new AuthService();

exports.login = async(req, res, next) => {
    const result = await authService.login(req, res)
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

exports.regenerateAuthtoken = async function (req, res, next) {}

exports.user = async function (req, res, next) {}