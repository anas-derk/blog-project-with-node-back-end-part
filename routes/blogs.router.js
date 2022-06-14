// create blogs router

const blogsRouter = require("express").Router();

// import blogs Controller

const blogsController = require("../controllers/blogs.controller");

// API Building For Blogs Router

blogsRouter.get("/all-blogs", blogsController.getAllBlogs);

blogsRouter.post("/", blogsController.postBlog);

blogsRouter.get("/", blogsController.getBlogInfo);

blogsRouter.put("/:blogId", blogsController.putBlogInfo);

blogsRouter.delete("/:blogId", blogsController.deleteBlog);

blogsRouter.get("/user-blogs", blogsController.getBlogsByUserId);

blogsRouter.get("/last-five-blogs", blogsController.getLastFiveBlogs);

module.exports = blogsRouter;