//import mongoose package
const mongoose = require("mongoose");

//We dictate what the schema for our app is going to be
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true}
});

//Allows us to export our Mongoose Schema
module.exports = mongoose.model('Post',postSchema);
