exports.renderResponse = function (res, result) {
    if (result) {
        switch (result.code) {
            case 200:
                res
                    .status(200)
                    .json({msg: result});
                break;
            case 201:
                res
                    .status(201)
                    .json({msg: result});
                break;
            case 400:
                res
                    .status(400)
                    .json({msg: result});
                break;
            default:
                res
                    .status(500)
                    .json({msg: 'Internal Error!'});
        }
    } else {
        res
            .status(500)
            .json({msg: 'Internal Error!'});
    }
}