const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const { User } = require('../models/user');

const createUser = async (userBody) => {
    var user = new User(userBody)
    await user.save()
    const token = await user.generateAuthToken()
    return { user, token }
}

const login = async (userBody) => {
    var user = await User.findByCredentials(userBody.email, userBody.password)
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED)

    var token = await user.generateAuthToken();
    return { user, token }
}

const logout = async (userBody) => {
    await userBody.user.removeToken(userBody.token)
}

const getUsers = async () => {
    await User.find({});
}

module.exports = {
    createUser,
    login,
    logout,
    getUsers
}