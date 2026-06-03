const express = require('express');

const config = require('../config');
const router = require('./network');
const errors = require('../network/errors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send({ error: false, status: 200, body: 'ok' });
});

app.use('/', router);
app.use(errors);

app.listen(config.cacheService.port, () => {
    console.log(`Cache service escuchando en el puerto ${config.cacheService.port}`);
});
