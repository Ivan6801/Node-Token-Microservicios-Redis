const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const error = require('../../../utils/error');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        if (!username || !password) {
            throw error('Usuario y password requeridos', 400);
        }

        const data = await store.query(TABLA, { username: username });

        if (!data) {
            throw error('Informacion invalida', 401);
        }

        const sonIguales = await bcrypt.compare(password, data.password);

        if (!sonIguales) {
            throw error('Informacion invalida', 401);
        }

        return auth.sign({
            id: data.id,
            username: data.username,
        });
    }

    async function upsert(data) {
        if (!data.id) {
            throw error('El id del usuario es requerido para las credenciales', 400);
        }

        if (data.username) {
            const existingUser = await store.query(TABLA, { username: data.username });

            if (existingUser && existingUser.id !== data.id) {
                throw error('El username ya existe', 409);
            }
        }

        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        if (!authData.username && !authData.password) {
            return null;
        }

        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };
};
