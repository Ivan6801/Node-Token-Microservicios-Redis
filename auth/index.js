const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret, {
        expiresIn: config.jwt.expiresIn,
    });
}

function verify(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw error('Token expirado', 401);
        }

        if (err.name === 'JsonWebTokenError') {
            throw error('Token invalido', 401);
        }

        throw err;
    }
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }

        return decoded;
    },

    logged: function(req) {
        return decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    verify,
    check,
};
