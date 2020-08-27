const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/v1')

const app = express();
const port = process.env.PORT || 3000;

// to parse body as json
app.use(bodyParser.json());

// v1 api routes
app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
