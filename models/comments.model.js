// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Comment Schema For User Model

const commentSchema = mongoose.Schema({
    userName: String,
    email: String,
    commentContent: String,
    blogId: String,
    commentPostDate: {
        type: Date,
        default: Date.now()
    }
});

// create Comment Model In Database

let CommentModel = mongoose.model("comment", commentSchema);

// required Blog Model

const { BlogModel } = require("./blogs.model");

// define add new comment function

function addNewComment(commentInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return BlogModel.findById(commentInfo.blogId);
        })
        .then(blogInfo => {
            if (blogInfo) {
                let comment = new CommentModel(commentInfo);
                return comment.save();
            } else {
                mongoose.disconnect();
                reject("عذراً لا يمكن إضافة التعليق لأنّ التدوينة  تمّ حذفها ...");
            }
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

// define get comments by blog id function

function getCommentsByBlogId(blogId) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CommentModel.find({ blogId });
        }).then(comments => {
            mongoose.disconnect();
            resolve(comments);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function getLastFiveCommments(){
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CommentModel.find({}).limit(5).sort({ commentPostDate: -1 });
        })
        .then(lastFiveComments => {
            mongoose.disconnect();
            resolve(lastFiveComments);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}
module.exports = {
    addNewComment,
    getCommentsByBlogId,
    getLastFiveCommments
}