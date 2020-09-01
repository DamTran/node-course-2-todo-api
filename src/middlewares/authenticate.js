const {User} = require('../models/user')
const httpStatus = require('http-status')

// authentication middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: 'user not found',
                ...(/*process.env.NODE_ENV === 'production' &&*/ { stack: '' })
            });
        }
        req.user = user
        req.token = token
        next()
    }).catch((err) => {
        res.status(httpStatus.UNAUTHORIZED).send({
            code: httpStatus.UNAUTHORIZED,
            message: err,
            ...(/*process.env.NODE_ENV === 'production' &&*/ { stack: '' })
        })
    })
}

module.exports = {
    authenticate
}