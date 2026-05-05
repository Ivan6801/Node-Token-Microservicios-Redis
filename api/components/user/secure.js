const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        try {
            switch (action) {
                case 'update':
                    auth.check.own(req, req.params.id || req.body.id);
                    break;
                default:
                    auth.check.logged(req);
                    break;
            }

            next();
        } catch (err) {
            next(err);
        }
    }

    return middleware;
}
