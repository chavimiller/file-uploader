const prisma = require("../lib/prisma");

// Display folders or files

async function showAllContent(req, res) {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      orderBy: { id: "asc" },
    });
    res.render("homepage", { errors: [], folders });
  } catch (err) {
    console.error("ERROR with showAllContent: ", err);
    res.status(500).send("Server error");
  }
}

// Ensure user is logged in and if not redirect to login
async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
}

module.exports = { showAllContent, ensureAuthenticated };
