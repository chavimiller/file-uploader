// const db = require("../?")

// Signup

async function signUpGet(req, res) {
  try {
    res.render("signup", { errors: [] });
  } catch (err) {
    console.error("ERROR in signUpGet: ", err);
    res.status(500).send("Server error");
  }
}

async function signUpPost(req, res) {}

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
