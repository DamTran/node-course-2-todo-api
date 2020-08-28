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
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found', undefined, []));
});
  

//error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode || 500).send({
            ...err
        })
    }

    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus[statusCode];
        new ApiError(statusCode, message, false, err.stack);
      }

    const statusCode = err.statusCode || 500
    return res.status(statusCode).send({
        name: httpStatus[statusCode],
        message: httpStatus[statusCode] || httpStatus[statusCode],
        status: err.statusCode || 500,
        error: httpStatus[statusCode],
        details: err
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
