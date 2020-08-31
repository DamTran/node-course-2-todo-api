require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/v1')
const ApiError = require('./utils/ApiError')
const httpStatus = require('http-status')
const { validate, ValidationError, Joi } = require('express-validation');
const { stack } = require('./routes/v1');

const app = express();
const port = process.env.PORT || 3000;
// to parse body as json
app.use(bodyParser.json());

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
  

//error handler middleware
// TODO: to be modified
app.use((err, req, res, next) => {
    let {statusCode, message} = err
    if (err instanceof ValidationError) {
        return res.status(statusCode).send({
            code: statusCode,
            message: message,
            ...(/*process.env.NODE_ENV === 'production' &&*/  { stack: err.details.body })
        })
    }

    if (!(err instanceof ApiError)) {
        const message = message || httpStatus[statusCode];
        new ApiError(statusCode, message, false, err.stack);
    }

    return res.status(statusCode).send({
        code: statusCode,
        message: err.message,
        ...(/*process.env.NODE_ENV === 'production' &&*/ { stack: err.stack })
    })
})

app.listen(port, () => {
    console.log('Environment: ', process.env.NODE_ENV)
    console.log(`Started on port ${port}`);
});

module.exports = { app };
