const express = require('express');

const response = require('../network/response');
const Store = require('../store/redis');

const router = express.Router();
const TABLE_PATTERN = ':tabla([a-zA-Z_]+)';

router.get(`/${TABLE_PATTERN}`, list);
router.get(`/${TABLE_PATTERN}/:id`, get);
router.post(`/${TABLE_PATTERN}`, insert);
router.put(`/${TABLE_PATTERN}`, upsert);
router.post(`/${TABLE_PATTERN}/query`, query);

async function list(req, res, next) {
    try {
        const data = await Store.list(req.params.tabla);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const data = await Store.get(req.params.tabla, req.params.id);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {
        const data = await Store.upsert(req.params.tabla, req.body);
        response.success(req, res, data, 201);
    } catch (error) {
        next(error);
    }
}

async function upsert(req, res, next) {
    try {
        const data = await Store.upsert(req.params.tabla, req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

async function query(req, res, next) {
    try {
        const data = await Store.query(req.params.tabla, req.body.query || req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;
