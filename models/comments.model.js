// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Comment Schema For User Model

const commentSchema = mongoose.Schema({
    userName: String,
    email: String,
    comment: String,
    postId: String,
    commentPostDate: Date
});

// create Comment Model In Database

let CommentModel = mongoose.model("comment", commentSchema);