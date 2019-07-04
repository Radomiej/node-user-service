'use strict';

const Hapi = require('@hapi/hapi');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    HomeController.register(server);
    UserController.register(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();