const express = require('express')
const userController = require('../../controllers/user.controller')
const {authenticate} = require('../../middlewares/authenticate')

const router = express.Router()

router
    .route('/')
    .post(userController.createUser)

router
    .route('/me')
    .all(authenticate)
    .get(userController.getUser)

router
    .route('/login')
    .all(authenticate)
    .get(userController.login)
    .post(userController.logout)

// will be in index router

module.exports = router;