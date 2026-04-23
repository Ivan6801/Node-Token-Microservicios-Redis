const db = {
    'user': [
        { id: 1, name: 'Carlos' }
    ]
};

function list(table) {
    return db[table] || [];
}
function get(tabla, id) {
    let col = list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}
function upsert(tabla, data) {
    db[collection].push(data);
}
function remove(tabla, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}