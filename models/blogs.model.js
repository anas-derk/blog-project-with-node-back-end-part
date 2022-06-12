// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Blog Schema Fro Blog Model

const blogSchema = mongoose.Schema({
    userId: String,
    blogTitle: String,
    blogContent: String,
    blogPostDate: {
        type: Date,
        default: Date.now()
    },
    blogWriterName: String,
});

// create Blog Model In Database

const BlogModel = mongoose.model("blog", blogSchema);

// Define Add New Blogs Function

function addNewBlog(blogInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let blog = new BlogModel(blogInfo);
            return blog.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

// Define Get All Blogs Function

function getAllBlogs() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return BlogModel.find({});
        }).then(blogs => {
            mongoose.disconnect();
            resolve(blogs);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

module.exports = { addNewBlog, getAllBlogs }