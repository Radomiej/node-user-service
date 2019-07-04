const UserModel = require('../models/UserModel');
const UserService = require('./UserService');

exports.authorize = async function (request, reply) {
    let userBasic = request.headers.authorization;
    console.log("header Authorization: " + userBasic);

    try {
        let user = await UserModel.findOne({basic: userBasic}).exec();
        if(!user) return reply.response(false).code(401);

        let rolesHeader =user.roles.join([separator = ',']);
        return reply.response(user).header('auth-roles', rolesHeader);
    } catch (error) {
        return reply.response(error).code(401);
    }
};