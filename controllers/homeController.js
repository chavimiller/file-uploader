// const db = require("../?")

// Display folders or files

async function showAllContent(req, res) {
  try {
  } catch (error) {}
}

// Ensure user is logged in and if not redirect to login
async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
}

module.exports = { showAllContent, ensureAuthenticated };
