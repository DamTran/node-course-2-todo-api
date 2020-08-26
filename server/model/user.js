const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const { response } = require('express');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `this is not valid email!`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function (){
    var user = this;
    console.log('User', user)
    //var userObject = user.toObject();
    //console.log('userObject', userObject)

    return _.pick(user, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'
    var token = jwt.sign({id: user._id.toHexString(), access}, 'secretkey').toString()
    console.log(token)

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;

    var decoded;
    try {
        decoded = jwt.verify(token, 'secretkey')
    } catch (e) {
        return Promise.reject('haha');
    }

    return User.findOne({
        _id: decoded.id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

var User = mongoose.model('User', UserSchema);


module.exports = {
    User
};
