const UserService = require('../services/UserService');

exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/{userId}',
        handler: UserService.getOne
    });
};