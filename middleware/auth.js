const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if (!token) 
        return res.status(401).json({msg: 'No auth-token, authorization required'})

    try { 
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Add user from payload to request
        req.user = decoded.id;
        next();
    } catch (e) { 
        if (e.name === 'TokenExpiredError') {
            res
                .status(400)
                .json({success: false, errorCode: 4001, msg: 'Auth Token has been expired.'})
        } else if (e.name === 'JsonWebTokenError') {
            res
                .status(400)
                .json({success: false, errorCode: 4001, msg: 'Invalid Auth Token.'})
        } else {
            res
                .status(500)
                .json({msg: e.name})
        }
    }

}

module.exports = auth;