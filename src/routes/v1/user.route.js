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

 /**
 * @swagger
 * path:
 *  /users/me:
 *    get:
 *      summary: Get me
 *      tags: [Users]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Me'
 *      responses:
 *        "200":
 *          description: ME
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Me'
 */

 /**
 * @swagger
 * path:
 *  /users/login:
 *    post:
 *      summary: Login
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

  /**
 * @swagger
 * path:
 *  /users/logout:
 *    post:
 *      summary: logout
 *      tags: [Auth]
 *      security:
 *       - ApiKeyAuth: []
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
    .post(userController.login)

router
    .route('/logout')
    .all(authenticate)
    .post(userController.logout)

module.exports = router;