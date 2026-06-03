const { nanoid } = require('nanoid');
const error = require('../../../utils/error');

const COLLECTION = 'post';

module.exports = function (injectedStore) {
    let Store = injectedStore;
    if (!Store) {
        Store = require('../../../store/dummy');
    }

    function list(query) {
        return Store.list(COLLECTION);
    }

    async function get(id) {
        const user = await Store.get(COLLECTION, id);
        if (!user) {
            throw error('No existe el post', 404);
        }

        return user;
    }

    async function upsert(data, user) {
        const post = {
            id: data.id,
            user: user,
            text: data.text,
        }

        if (!post.id) {
            post.id = nanoid();
        }

        return Store.upsert(COLLECTION, post).then(() => post);
    }

    async function like(post, user) {
        const like = await Store.upsert(COLLECTION + '_like', {
            post: post,
            user: user,
        });

        return like;
    }

    async function postsLiked(user) {
        return Store.query(COLLECTION + '_like', { user: user });
    }

    async function postLikers(post) {
        return Store.query(COLLECTION + '_like', { post: post });
    }

    return {
        list,
        get,
        upsert,
        like,
        postsLiked,
        postLikers,
    }
}
