const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/userSchema.js");
const Signup = require("./models/signupSchema.js");
const mongoURL = "mongodb://127.0.0.1:27017/blogs";
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,(""))));



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

app.listen(8080, () =>{
    console.log("The port is working on port number 8080");
});

//User Signup
app.get("/blogs/signup", async (req, res) =>{
    res.render("./User/signupForm.ejs");
});
app.get("/signup", async (req, res) =>{
    const signupUser = await Signup.find({});
    console.log(signupUser);
    res.render("./User/signup.ejs");
});

app.post("/blogs/signup", async (req, res) =>{
    const newUser = new Signup(req.body.User);
    const savedUser = await newUser.save();
    res.redirect("/blogs");
    console.log(savedUser);
})

//Creating Blogs
app.get("/blogs", async (req, res) =>{
    const alldata = await User.find({});
    res.render("home.ejs", {alldata});
});

app.get("/blogs/new", (req, res) =>{
    res.render("new.ejs");
});

app.post("/blogs", async (req, res) =>{
    const newBlog = new User(req.body.Data);
    const savedBlog = await newBlog.save();
    res.redirect("/blogs");
    console.log(savedBlog);
});

app.get("/blogs/:id", async (req, res) =>{
    let {id} = req.params;
    const userID = await User.findById(id);
    res.render("detailedView.ejs", {userID});
});

app.get("/blogs/:id/edit", async (req, res) =>{
    let {id} = req.params;
    const userID = await User.findById(id);
    res.render("edit.ejs", {userID});
});

app.patch("/blogs/:id", async (req, res) => {
    let {id} = req.params;
    let updatedBlog = await User.findByIdAndUpdate(id, {...req.body.Data});
    res.redirect("/blogs");
    console.log(updatedBlog);
});

app.delete("/blogs/:id", async (req, res) =>{
    let{id} = req.params;
    let deletedBlog = await User.findByIdAndDelete(id);
    res.redirect("/blogs");
    console.log(deletedBlog);
});



