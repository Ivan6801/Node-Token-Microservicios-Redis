const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    return function middleware(req, res, next) {
        try {
            if (action === 'update') {
                auth.check.own(req, req.params.id || req.body.id);
            } else {
                auth.check.logged(req);
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
