const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('log_reg_form', UserSchema);

module.exports = User;
