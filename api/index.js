const config = require('../config');
const app = require('./app');

if (require.main === module) {
    app.listen(config.api.port, () => {
        console.log('Api escuchando en el puerto ', config.api.port);
    });
}

module.exports = app;
