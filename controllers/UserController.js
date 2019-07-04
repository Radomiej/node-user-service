const UserService = require('../services/UserService');

exports.register = function (server) {
    server.route({
        method: 'GET',
        path: '/user',
        handler: UserService.getAll
    });

    server.route({
        method: 'GET',
        path: '/user/{id}',
        handler: UserService.getOne
    });
};