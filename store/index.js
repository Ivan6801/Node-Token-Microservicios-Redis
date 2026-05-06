const config = require('../config');

module.exports = config.remoteDB
    ? require('./mysql')
    : require('./dummy');
