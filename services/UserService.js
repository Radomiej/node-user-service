const UserModel = require('../models/UserModel');

exports.getOne = async function (request, h) {
    try {
        let user = await UserModel.findById(request.params.id).exec();
        return h.response(user);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.getAll = async function (request, h) {
    try {
        let user = await UserModel.find().exec();
        return h.response(user);
    } catch (error) {
        return h.response(error).code(500);
    }
};


exports.count = function () {
    UserModel.estimatedDocumentCount({}, function (err, c) {
        console.log('internal user count: ' + c);
        return c;
    });
};

exports.addOne = function (userForm) {
    const user = new UserModel();

    user._id = null;
    user.login = userForm.login;
    user.password = userForm.password;
    user.basic = makeBaseAuth(user.login, user.password);
    user.roles = userForm.roles;

    console.log('basic: ' + user.basic);

    user.save(function (err) {


        if (err) {
            console.error(err);
            return false;
        }
        return user;
    });
};

function makeBaseAuth(user, password) {
    let tok = user + ':' + password;

    let buff = Buffer.from(tok);
    let hash = buff.toString('base64');
    return "Basic " + hash;
}