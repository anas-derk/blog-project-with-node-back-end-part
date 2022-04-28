// create authentication router

const authRouter = require("express")();

// import authController

const authController = require("../../controllers/auth.controller");

// api building For Authentication

authRouter.post("/sign-up", authController.postSignUp);

authRouter.get("/login", authController.getLoginIn);

module.exports = authRouter;