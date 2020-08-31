const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const { User } = require('../models/user');
const { stack } = require('../routes/v1');

const userService = async (userBody) => {
    var user = new User(userBody)
    await user.save()
    const token = user.generateAuthToken()
    return { user, token }

}

module.exports = {
    userService
}