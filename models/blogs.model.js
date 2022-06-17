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

// Define Get Specification Blog Function

function getBlogInfo(blogId) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return BlogModel.findById(blogId);
        })
        .then(blogInfo => {
            mongoose.disconnect();
            resolve(blogInfo);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

// Define Edit Specification Blog Function

function editBlogInfo(blogId, newBlogInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return BlogModel.updateOne({_id: blogId}, {
                blogTitle: newBlogInfo.blogTitle,
                blogContent: newBlogInfo.blogContent,
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        })
    });
}

// Define Delete Specification Blog Function

function deleteBlog(blogId) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return BlogModel.deleteOne({ _id: blogId});
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

// Define Get Blogs By User Id Function

function getBlogsByUserId(userId) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return BlogModel.find({userId});
        })
        .then(blogs => {
            mongoose.disconnect();
            resolve(blogs);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

// Define Get Last Five Blogs Function

function getLastFiveBlogs() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return BlogModel.find({}).limit(5).sort({ blogPostDate: -1 });
        })
        .then(lastFiveBlogs => {
            mongoose.disconnect();
            resolve(lastFiveBlogs);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

module.exports = {
    addNewBlog,
    getAllBlogs,
    getBlogInfo,
    editBlogInfo,
    deleteBlog,
    getBlogsByUserId,
    getLastFiveBlogs,
    BlogModel
};