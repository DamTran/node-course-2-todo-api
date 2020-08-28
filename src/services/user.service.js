const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const { User } = require('../models/user');
const { stack } = require('../routes/v1');


const userService = async (userBody) => {
    try {
        var user = new User(userBody)
        await user.save()
        const token = user.generateAuthToken()
        return { user, token }
    } catch (err) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Am here');
    }
    // user.save().then(() => {
    //     return user.generateAuthToken();
    //     //res.send(doc);
    // }).then((token) => {
    //     console.log(token)
    //     res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     console.log('Eror', e);
    //     res.status(400).send(e)
    // });
}




module.exports = {
    userService
}