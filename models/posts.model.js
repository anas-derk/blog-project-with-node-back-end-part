// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// Create Post Schema For Post Model

const postSchema = mongoose.Schema({
    postTitle: String,
    postContent: String,
    postAuthor: String,
    postDate: Date
});

// Create Post Model In Database

const PostModel = mongoose.model("post", postSchema);