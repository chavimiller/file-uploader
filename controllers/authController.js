const prisma = require("../lib/prisma");
const { validationResult, matchedData } = require("express-validator");

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
    await prisma.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        password: userData.password,
      },
    });
  } catch (err) {}
}

// Login

async function loginGet(req, res) {
  try {
    res.render("login", { errors: [] });
  } catch (err) {
    console.error("ERROR in loginGet: ", err);
    res.status(500).send("Server error");
  }
}

async function loginPost(req, res) {}

module.exports = { signUpGet, signUpPost, loginGet, loginPost };
