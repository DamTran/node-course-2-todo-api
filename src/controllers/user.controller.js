const _ = require('lodash');
const express = require('express');
const { User } = require('../models/user');
const catchAsync = require('../utils/catchAsync')
const {userService} = require('../services')

const httpStatus = require('http-status');


const createUser = catchAsync(async (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const {user, token} = await userService.createUser(body)
    res.status(httpStatus.CREATED).header('x-auth', token).send(user);
})

const getUser =  catchAsync(async (req, res) => {
    res.send(req.user)
})

const login = catchAsync(async (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const { user, token } = await userService.login(body)
    res.status(httpStatus.OK).header('x-auth', token).send(user);
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




