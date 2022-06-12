// create blogs router

const blogsRouter = require("express").Router();

// import blogs Controller

const blogsController = require("../controllers/blogs.controller");

// API Building For Blogs Router

blogsRouter.get("/all-blogs", blogsController.getAllBlogs);

blogsRouter.post("/add-new-blog", blogsController.postBlog);

module.exports = blogsRouter;