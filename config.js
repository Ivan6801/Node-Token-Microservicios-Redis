const fs = require('fs');
const path = require('path');

function loadEnvFile(file) {
    const envPath = path.join(__dirname, file);

    if (!fs.existsSync(envPath)) {
        return;
    }

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

    lines.forEach((line) => {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }

        const separator = trimmed.indexOf('=');

        if (separator === -1) {
            return;
        }

        const key = trimmed.slice(0, separator).trim();
        let value = trimmed.slice(separator + 1).trim();

        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    });
}

loadEnvFile('.env');
loadEnvFile('.env.local');

module.exports = {
    remoteDB: String(process.env.REMOTE_DB || 'false').toLowerCase() === 'true',
    api: {
        port: process.env.API_PORT || 3001,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
        expiresIn: process.env.JWT_EXPIRES_IN || '2h',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: Number(process.env.MYSQL_PORT || 3306),
        user: process.env.MYSQL_USER || 'app_user',
        password: process.env.MYSQL_PASSWORD || 'app_password',
        database: process.env.MYSQL_DATABASE || 'node_tokens',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || process.env.MYSQL_SERVICE_PORT || 3003,
    },
    cacheService: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3004,
    },
    redis: {
        url: process.env.REDIS_URL || null,
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT || 6379),
        password: process.env.REDIS_PASSWORD || '',
        db: Number(process.env.REDIS_DB || 0),
    },
}
