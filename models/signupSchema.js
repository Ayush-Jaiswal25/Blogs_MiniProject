const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    Email: String,
    Password: String,
})

const Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;