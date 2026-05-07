const { nanoid } = require('nanoid');
const auth = require('../auth');
const error = require('../../../utils/error');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;

    if (!store) {   
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }
    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        if (!body.name) {
            throw error('El nombre es requerido', 400);
        }

        const user = {
            name: body.name,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        const result = await store.upsert(TABLA, user);

        await auth.upsert({
            id: user.id,
            username: body.username,
            password: body.password,
        });

        return result;
    }

    function follow(from, to) { 
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    return {
        list,
        get,
        upsert,
        follow,
    }
}
