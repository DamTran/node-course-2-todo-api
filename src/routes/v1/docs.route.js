const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/models/*.js', 'src/routes/v1/*.js'],
});

// https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
// Swagger-ui-express adds middleware to our Express app and renders beautiful UI for our docs
// while swagger-jsdoc allows us to document our API using JSDoc by adding a swagger tag to our comment block

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
