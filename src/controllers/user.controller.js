const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const { authenticate } = require('./middlewares/authenticate')

const app = express();
const port = process.env.PORT || 3000;


const catchAsync = require('../utils/catchAsync')

// POST User
const createUsers = catchAsync(async (req, res) => {
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
});
// GET USER
// app.get('/users/me', authenticate, (req, res) => {
//     res.send(req.user)
// })
const getUser =  catchAsync(async (req, res) => {
    res.send(req.user)
})

// POST/users/login(email,password)
app.post('/users/login', async (req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password'])
        var user = await User.findByCredentials(body.email, body.password)
        var token = await user.generateAuthToken();
        // gnerateToken 
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(401).send(e)
    }
})

// async await method
app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})




