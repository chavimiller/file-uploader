const authController = require("../controllers/authController");
const { Router } = require("express");
const authRouter = new Router();
const validateUser = require("../validators/signupValidator");
const passport = require("../config/passport");

// GET sign up
authRouter.get("/signup", authController.signUpGet);
// POST sign up
authRouter.post("/signup", validateUser, authController.signUpPost);
// GET sign in
authRouter.get("/login", authController.loginGet);
// POST sign in
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
  })
);
// GET logout
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
