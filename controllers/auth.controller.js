const AuthService = require('../services/auth.service');
const ResponseHelper = require('../helpers/apiResponse')
const authService = new AuthService();

exports.login = async(req, res) => {
    const result = await authService.login(req)
    ResponseHelper.renderResponse(res, result);
}

exports.regenerateAuthtoken = function (req, res) {
    const result = authService.regenerateAuthtoken(req);
    ResponseHelper.renderResponse(res, result);
}

exports.user = async function (req, res) {
    const result = await authService.getUserByAccessToken(req);
    ResponseHelper.renderResponse(res, result);
}