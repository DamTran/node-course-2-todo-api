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
 *      tags: [Auths]
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
 *      tags: [Auths]
 *      security:
 *       - ApiKeyAuth: []
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
 *      tags: [Auths]
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
 *    delete:
 *      summary: logout
 *      tags: [Auths]
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

 /**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get list of users
 *      tags: [Auths]
 *      responses:
 *        "200":
 *          description: ME
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

 router
    .route('/')
    .post(validate(userValidation, {}, {}), userController.createUser)
    .get(userController.getUsers)

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
    .delete(userController.logout)

module.exports = router;