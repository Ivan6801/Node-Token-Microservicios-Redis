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
}
