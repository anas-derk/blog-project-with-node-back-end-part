// create authentication router

const authRouter = require("express")();

// import authController

const authController = require("../../controllers/auth.controller");

authRouter.post("/sign-up", authController.postSignUp);

module.exports = authRouter;