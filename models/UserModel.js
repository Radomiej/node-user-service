const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required: false},
    basic: {type: String, required: true, unique: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
    roles: {type: [String], required: false},
    email: {type: String, required: false},
    phone: {type: String, required: false}
}, {collection: 'users'});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret._class;
        delete ret.password;
        delete ret.base;
    }
});

UserSchema.index({ basic: 1 });

// Export the models
module.exports = mongoose.model('User', UserSchema);