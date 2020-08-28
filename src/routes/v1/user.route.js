const express = require('express')
const userController = require('../../controllers/user.controller')
const {authenticate} = require('../../middlewares/authenticate')
const { validate, ValidationError, Joi } = require('express-validation')

const {userValidation} = require('../../validations/user.validation')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */ 

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

 router
    .route('/')
    .post(validate(userValidation, {}, {}), userController.createUser)

router
    .route('/me')
    .all(authenticate)
    .get(userController.getUser)

router
    .route('/login')
    .all(authenticate)
    .get(userController.login)
    .post(   userController.logout)

module.exports = router;