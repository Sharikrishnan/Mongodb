const express = require('express');

const { getAllTodos, getTodo } = require('./Todo/todo-controller');
const { addTodo, deleteTodo } = require('./Todo/todo-controller');
const { patchTodo } = require('./Todo/todo-controller');

const getRoutes = () => ({
    '/todos': [getAllTodos],
    '/todos/:id': [getTodo],
});

const postRoutes = () => ({
    '/todos': [addTodo],
});

const patchRoutes = () => ({
    '/todos/:id': [patchTodo],
});

const deleteRoutes = () => ({
    '/todos/:id': [deleteTodo],
});

const routes = () => ({
    get: getRoutes(),
    post: postRoutes(),
    patch: patchRoutes(),
    delete: deleteRoutes(),
});

module.exports.apiRoutes = () => {
    const router = express.Router();
    Object.entries(routes()).forEach(([type, routeList]) => {
        Object.entries(routeList).forEach(([key, value]) => {
            if (type === 'get') {
                router.get(key, value);
            } else if (type === 'post') {
                router.post(key, value);
            } else if (type === 'patch') {
                router.patch(key, value);
            } else if (type === 'delete') {
                router.delete(key, value);
            }
        });
    });

    return router;
};
