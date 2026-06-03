const mysql = require('mysql2');
const config = require('../config');

const TABLES = {
    user: 'user',
    auth: 'auth',
    user_follow: 'user_follow',
    post: 'post',
    post_like: 'post_like',
};

const RETRYABLE_ERRORS = new Set([
    'ECONNREFUSED',
    'ETIMEDOUT',
    'PROTOCOL_CONNECTION_LOST',
]);

const LIST_QUERY_TABLES = new Set([
    'user_follow',
    'post_like',
]);

let connection;
let reconnectTimer;

function createConnection() {
    return mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
    });
}

function scheduleReconnect(error) {
    if (reconnectTimer) {
        return;
    }

    if (connection) {
        connection.removeAllListeners('error');
        connection.destroy();
        connection = null;
    }

    console.log(`Reintentando conexión a DB en 3s${error?.code ? ` (${error.code})` : ''}...`);
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        handleConnection();
    }, 3000);
}

function handleConnection() {
    connection = createConnection();

    connection.connect((error) => {
        if (error) {
            console.error('DB error:', error.code || error.message);
            scheduleReconnect(error);
            return;
        }

        console.log('DB Connected!');
    });

    connection.on('error', (error) => {
        console.error('DB error:', error);

        scheduleReconnect(error);
    });
}

function querySql(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}

function getTable(tabla) {
    const safeTable = TABLES[tabla];

    if (!safeTable) {
        throw new Error(`Tabla no soportada: ${tabla}`);
    }

    return safeTable;
}

async function list(tabla) {
    const safeTable = getTable(tabla);
    return querySql(`SELECT * FROM ??`, [safeTable]);
}

async function get(tabla, id) {
    const safeTable = getTable(tabla);
    const rows = await querySql(`SELECT * FROM ?? WHERE id = ? LIMIT 1`, [safeTable, id]);
    return rows[0] || null;
}

async function upsert(tabla, data) {
    const safeTable = getTable(tabla);

    if (tabla === 'user_follow' || tabla === 'post_like') {
        await querySql(`INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?`, [safeTable, data, data]);
        return query(tabla, data);
    }

    await querySql(`INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?`, [safeTable, data, data]);
    return get(tabla, data.id);
}

async function remove(tabla, id) {
    const safeTable = getTable(tabla);
    const result = await querySql(`DELETE FROM ?? WHERE id = ?`, [safeTable, id]);
    return result.affectedRows > 0;
}

async function query(tabla, q) {
    const safeTable = getTable(tabla);
    const keys = Object.keys(q || {});

    if (!keys.length) {
        return null;
    }

    const where = keys.map(() => '?? = ?').join(' AND ');
    const values = [];

    keys.forEach((key) => {
        values.push(key, q[key]);
    });

    const rows = await querySql(`SELECT * FROM ?? WHERE ${where}`, [safeTable, ...values]);

    if (LIST_QUERY_TABLES.has(tabla)) {
        return rows;
    }

    return rows[0] || null;
}

handleConnection();

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};
