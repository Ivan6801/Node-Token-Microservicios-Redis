const store = require('../../../store/dummy.js');

const TABLA = 'user';

function list() {
    return store.list('user');
}

module.exports = {
    list
};