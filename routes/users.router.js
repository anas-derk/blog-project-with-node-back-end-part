// create users router

const usersRouter = require("express")();

// import usersController

const usersController = require("../controllers/users.controller");

// API building For Users Router

usersRouter.post("/sign-up", usersController.postSignUp);

usersRouter.get("/login", usersController.getLoginIn);

module.exports = usersRouter;