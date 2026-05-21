const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();
const TABLE_PATTERN = ':tabla(user|auth|user_follow)';
const QUERY_TABLE_PATTERN = ':table(user|auth|user_follow)';

router.get(`/${TABLE_PATTERN}`, list);
router.get(`/${TABLE_PATTERN}/:id`, get);
router.post(`/${TABLE_PATTERN}`, insert);
router.put(`/${TABLE_PATTERN}`, upsert);
router.post(`/${QUERY_TABLE_PATTERN}/query`, query);

async function list(req, res, next) {
  try {
    const datos = await Store.list(req.params.tabla);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

async function query(req, res, next) {
  try {
    const datos = await Store.query(req.params.table, req.body.query, req.body.join);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const datos = await Store.get(req.params.tabla, req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

async function insert(req, res, next) {
  try {
    const datos = await Store.upsert(req.params.tabla, req.body);
    response.success(req, res, datos, 201);
  } catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    const datos = await Store.upsert(req.params.tabla, req.body);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
