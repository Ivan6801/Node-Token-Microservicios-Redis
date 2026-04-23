const express = require('express');

const response = require('../../../network/response.js');
const Controller = require('./controller.js');

const router = express.Router();

router.get('/', (req, res) => {
    const lista = Controller.list();
    response.success(req, res, lista, 200);
});

module.exports = router;