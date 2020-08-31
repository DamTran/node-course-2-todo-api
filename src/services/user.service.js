const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const { User } = require('../models/user');
const { stack } = require('../routes/v1');

const createUser = async (userBody) => {
    var user = new User(userBody)
    await user.save()
    const token = user.generateAuthToken()
    return { user, token }
}

const login = async (userBody) => {
    var user = await User.findByCredentials(userBody.email, userBody.password)
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED)

    var token = await user.generateAuthToken();
    return { user, token }
}

module.exports = {
    createUser,
    login
}