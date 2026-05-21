const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const swaggerDoc = require('./swagger.json');

const app = express();

app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

module.exports = app;
