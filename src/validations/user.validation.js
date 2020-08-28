const express = require('express')
const bodyParser = require('body-parser')
const { validate, ValidationError, Joi } = require('express-validation')
 
const userValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

module.exports = {
    userValidation
}