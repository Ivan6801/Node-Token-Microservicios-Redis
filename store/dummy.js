const db = {
    'user': [
        { id: '1', name: 'Karla' },
        { id: '2', name: 'Ivan' },
    ],
    'auth': [
        { id: 1, username: 'ivan', password: '$2b$05$GPyNqsljsvLIaaXbIHzeg.SG.lbRRebR1CGkWJTJQ8rbYdxf8C9QG' }
    ]
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }

    const index = db[tabla].findIndex(item => item.id === data.id);

    if (index === -1) {
        db[tabla].push(data);
        return data;
    }

    db[tabla][index] = {
        ...db[tabla][index],
        ...data,
    };

    return db[tabla][index];
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];

    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};
