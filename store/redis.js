const config = require('../config.js');
const { createClient } = require('redis');

const redisUrl = config.redis.url || `redis://${config.redis.host}:${config.redis.port}/${config.redis.db}`;
const clientOptions = { url: redisUrl };

if (config.redis.password) {
    clientOptions.password = config.redis.password;
}

const client = createClient(clientOptions);

client.on('connect', () => {
    console.log('Conectado a Redis');
});

client.on('error', (error) => {
    console.error(`Redis error: ${error.message}`);
});

const ready = client.connect();
ready.catch(() => {});

async function ensureClient() {
    try {
        await ready;
    } catch (error) {
        throw Error(`Intento de conexion a base de datos - ${error.message}`);
    }

    return client;
}

async function readTable(table) {
    const redis = await ensureClient();
    const data = await redis.get(table);
    return data ? JSON.parse(data) : [];
}

async function writeTable(table, data) {
    const redis = await ensureClient();
    await redis.set(table, JSON.stringify(data));
}

async function list(table) {
    return readTable(table);
}

async function get(table, id) {
    const rows = await readTable(table);
    return rows.find((item) => item.id === id) || null;
}

async function upsert(table, data) {
    const rows = await readTable(table);

    if (table === 'user_follow') {
        const index = rows.findIndex((item) => item.user_from === data.user_from && item.user_to === data.user_to);

        if (index === -1) {
            rows.push(data);
            await writeTable(table, rows);
            return data;
        }

        rows[index] = {
            ...rows[index],
            ...data,
        };

        await writeTable(table, rows);
        return rows[index];
    }

    const index = rows.findIndex((item) => item.id === data.id);

    if (index === -1) {
        rows.push(data);
        await writeTable(table, rows);
        return data;
    }

    rows[index] = {
        ...rows[index],
        ...data,
    };

    await writeTable(table, rows);
    return rows[index];
}

async function query(table, q) {
    const rows = await readTable(table);
    const [key] = Object.keys(q);

    return rows.find((item) => item[key] === q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    query,
};
