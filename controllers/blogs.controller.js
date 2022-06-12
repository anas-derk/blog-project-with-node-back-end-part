// require Blog Object

const blogObject = require("../models/blogs.model");

// Define Post Blog Controll Function

function postBlog(req, res) {
    let blogInfo = req.body;
    blogObject.addNewBlog(blogInfo)
    .then(() => {
        res.json();
    })
    .catch(err => console.log(err));
}

// Define Get All Blogs Controll Function

function getAllBlogs(req, res) {
    blogObject.getAllBlogs()
    .then(blogs => {
        res.json(blogs);
    })
    .catch(err => console.log(err));
}

// Define Get Blog Controll Function

function getBlogInfo(req, res) {
    let blogId = req.query.blogId;
    blogObject.getBlogInfo(blogId).then(blogInfo => {
        res.json(blogInfo);
    }).catch(err => console.log(err));
}

function putBlogInfo(req, res) {
    let blogId = req.params.blogId;
    let newBlogInfo = req.body;
    blogObject.editBlogInfo(blogId, newBlogInfo).then(() => {
        res.json();
    }).catch(err => console.log(err));
}

function deleteBlog(req, res) {
    let blogId = req.params.blogId;
    blogObject.deleteBlog(blogId).then(() => {
        res.json();
    }).catch(err => console.log(err));
}

module.exports = { postBlog , getAllBlogs, getBlogInfo, putBlogInfo, deleteBlog };