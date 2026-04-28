const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller')();

const router = express.Router();

router.get('/', (req, res) => {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        }).catch((error) => {
            response.error(req, res, error.message, 500);
        })
});

router.get('/:id', function (req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        }).catch((error) => {
            response.error(req, res, error, 500);
        })
});

module.exports = router;