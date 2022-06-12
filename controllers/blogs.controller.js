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

module.exports = { postBlog , getAllBlogs };