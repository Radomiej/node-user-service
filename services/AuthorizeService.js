const UserModel = require('../models/UserModel');
const UserService = require('./UserService');

exports.authorize = async function (request, h) {
    let userBasic = request.headers.Authorization;
    console.log("header Authorization: " + userBasic);

    try {
        let user = await UserModel.find({basic: userBasic}).exec();
        return h.response(user);
    } catch (error) {
        return h.response(error).code(401);
    }
};