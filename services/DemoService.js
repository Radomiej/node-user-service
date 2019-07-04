const UserModel = require('../models/UserModel');
const UserService = require('./UserService');

exports.init = function () {

    //Prepare demo
    // if(UserService.count() > 0) return;

    //Clean database
    UserModel.deleteMany({}, (err) => {
        console.error('delete all users');
        addDemoUsers();
        // console.log('user count: ' + UserService.count());
    });


};

function addDemoUsers() {
    let adminUser = {
        login: "admin",
        password: "admin",
        roles: ['admin', 'user', 'manager']
    };

    UserService.addOne(adminUser);
}