// this config is for swaggerJsdoc
const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'demo APIs',
    version,
    description:
    "A test project to understand how easy it is to document and Express API",
    license: {
      name: 'DamTQ',
      url: 'https://node-course-2-todo-api.herokuapp.com/api/v1/docs/',
    },
  },
  servers: [
    {
      url: `https://node-course-2-todo-api.herokuapp.com/api/v1/`,
    },
  ]
};

module.exports = swaggerDef;
