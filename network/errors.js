const response = require('./response');

function errors(err, req, res, next) {
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    if (status >= 500) {
        console.error('[error]', err);
    } else {
        console.warn('[warn]', message);
    }

    response.error(req, res, message, status);
}

module.exports = errors;
