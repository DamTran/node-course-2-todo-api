const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const bcrypt = require('bcryptjs')

// using schema so that we can add more method to it
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

// override response
UserSchema.methods.toJSON = function (){
    var user = this;
    return _.pick(user, ['_id', 'email'])
}

// this is instance method
UserSchema.methods.removeToken = function (token) {
    var user = this;

    // $pull parameter to update the token 
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })
}

// this is instance method to update db
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'
    var token = jwt.sign({id: user._id.toHexString(), access}, 'secretkey').toString()

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    })
}

// find, not update
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

// asyn method will be replaced Promise method
UserSchema.statics.findByCredentials = async function (email, password) {
    var User = this;

    var user = await User.findOne({ email });

    if (!user) return Promise.reject('user not found')

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                resolve(user)
            } else {
                reject('password is incorrect')
            }
        })
    })
}

// mongoose middleware
UserSchema.pre('save', function (next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
