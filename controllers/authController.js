const prisma = require("../lib/prisma");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

// Signup

async function signUpGet(req, res) {
  try {
    res.render("signup", { errors: [], data: [] });
  } catch (err) {
    console.error("ERROR in signUpGet: ", err);
    res.status(500).send("Server error");
  }
}

async function signUpPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", {
      errors: errors.array(),
      data: req.body,
    });
  }
  const userData = matchedData(req);

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        password: hashedPassword,
      },
    });
    res.redirect("/auth/login");
  } catch (err) {
    console.error("ERROR with signUpPost: ", err);
    res.status(500).send("Server error");
  }
}

async function loginGet(req, res) {
  try {
    res.render("login");
  } catch (err) {
    console.error("ERROR in loginGet: ", err);
    res.status(500).send("Server error");
  }
}
async function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      res.redirect("/auth/login");
    });
  });
}

module.exports = { signUpGet, signUpPost, loginGet, logout };
