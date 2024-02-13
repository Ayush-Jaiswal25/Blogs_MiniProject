const mongoose = require("mongoose");
const sampledata = require("./blogData.js");
const User = require("../models/userSchema.js");
const Signup = require("../models/signupSchema.js");
const mongoURL = "mongodb://127.0.0.1:27017/blogs";


main()
.then(() =>{
    console.log("connection successfully built from the Mongo Database");
})
.catch((err) =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongoURL);
}

const initDB = async() =>{
    await User.deleteMany({});
    await User.insertMany(sampledata.data);
    // await Signup.deleteMany({});
    // await Signup.insertMany(sampledata.data);
    console.log("Data was initalized successfully");
};
initDB();