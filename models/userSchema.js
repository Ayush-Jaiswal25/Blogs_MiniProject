const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: String,
    Topic: String,
    Blog: String,

})

const User = mongoose.model("User", userSchema);
module.exports = User;