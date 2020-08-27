const _ = require('lodash');
const express = require('express');
const { User } = require('../models/user');
const catchAsync = require('../utils/catchAsync')

// createUser
const createUser = catchAsync(async (req, res) => {
    // TODO SERVICE
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(doc);
    }).then((token) => {
        console.log(token)
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log('Eror', e);
        res.status(400).send(e)
    });
})
// GET USER
const getUser =  catchAsync(async (req, res) => {
    res.send(req.user)
})

// // POST/users/login(email,password)

const login = catchAsync(async (req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password'])
        var user = await User.findByCredentials(body.email, body.password)
        var token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(401).send(e)
    }
})

// async await method
const logout =  catchAsync(async (req, res) => {
    try {
        await req.user.removeToken(req.token)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = {
    createUser,
    getUser,
    login,
    logout
}




