const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', secure('logged'), list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id', secure('logged'), get);
router.post('/', upsert);
router.put('/:id', secure('update'), upsert);

function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        }).catch(next)
};

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        }).catch(next)
};

function upsert(req, res, next) {
    if (req.params.id) {
        req.body.id = req.params.id;
    }

    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        }).catch(next)
};

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then((result) => {
            response.success(req, res, result, 201);
        }).catch(next)
}


module.exports = router;
