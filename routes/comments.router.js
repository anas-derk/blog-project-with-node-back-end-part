// create comments router

const commentsRouter = require("express").Router();

// import comments controller

const commentsController = require("../controllers/comments.controller");

// API Building For Blogs Router

commentsRouter.post("/", commentsController.postComment);

commentsRouter.get("/", commentsController.getCommentsByBlogId);

module.exports = commentsRouter;