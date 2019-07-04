const AuthorizeService = require('../services/AuthorizeService');

exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/auth',
        handler: AuthorizeService.authorize
    });

};