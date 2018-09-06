//Import express to app.js
const express = require("express");
//from "body parser package", install w/ npm install --save body-parser
const bodyParser = require("body-parser");
//pulls schema blueprint from models folder
const Post = require("./models/post");
//Connect to database
const mongoose = require("mongoose");

//creates an express app
const app = express();

//Sets up connection to our MongoDB cloud
mongoose.connect("mongodb+srv://***username***:***yourPW***@cluster0-xedvk.mongodb.net/node-angular?retryWrites=true")
.then(() => {
  console.log('Connection to Database Successful');
})
.catch(() => {
  console.log('Connection to Database failed');
});

//parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//header to allow any domain to access our resources
app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //Incoming request might have these extra headers
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requestsed-With, Content-Type, Accept"
  );
  //More headers to allow access
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added sucessfully",
      postId: createdPost._id
    });
  });
});

//returns a response to a request
app.get("/api/posts",(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Post fethced succesfully!",
      posts: documents
    });
  });
});
  /*//returning a 200 success response and a message letting the requestor know they got posts and sending our array of posts
  res.status(200).json({
    message: "Post fethced succesfully!",
    posts: posts
  });
});*/

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Post Deleted!" });
  });
});

//exports entire app and middlwares
module.exports = app;
