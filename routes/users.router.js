// create users router

const usersRouter = require("express").Router();

// import usersController

const usersController = require("../controllers/users.controller");

// API building For Users Router

usersRouter.post("/sign-up", usersController.postSignUp);

usersRouter.get("/login", usersController.getLoginIn);

usersRouter.get("/user-info", usersController.getUserInfo);

usersRouter.put("/:userId", usersController.putUserInfo);

module.exports = usersRouter;