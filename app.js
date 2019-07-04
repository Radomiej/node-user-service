'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');
const AuthorizeController = require('./controllers/AuthorizeController');

const DemoService = require('./services/DemoService');


const init = async () => {
    let serverPort = process.env.PORT || 3000;

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    HomeController.register(server);
    UserController.register(server);
    AuthorizeController.register(server);

    initMongo();

    //Run Demo
    DemoService.init();

    await server.start();
    console.log('Server running on %s', server.info.uri);
};


const initMongo = function(){
    //MongodDB
    let mongoDbHost = process.env.MONGODB_HOST || 'localhost';
    let mongoDbPort = process.env.MONGODB_PORT || '27017';
    let mongoDbDatabase = process.env.MONGODB_DATABASE || 'users-dev';

    // MongoDB: Setup new features
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    //Set up default mongoose connection
    const mongoDB = 'mongodb://' + mongoDbHost + ':' + mongoDbPort + '/' + mongoDbDatabase;
    mongoose.connect(mongoDB, {useNewUrlParser: true});
    //Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    console.log('MongoDB: ' + mongoDB);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();