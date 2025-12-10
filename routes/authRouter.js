const authController = require("../controllers/authController");
const { Router } = require("express");
const authRouter = new Router();

// GET sign up
authRouter.get("/signup", authController.signUpGet);
// POST sign up

// GET sign in
authRouter.get("/login", authController.loginGet);
// POST sign in

module.exports = authRouter;
