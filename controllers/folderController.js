const prisma = require("../lib/prisma");

async function newFolderPost(req, res) {
  try {
    await prisma.folder.create({
      data: {
        user: { connect: { id: Number(req.user.id) } },
        name: req.body.name,
      },
    });
    res.redirect("/home");
  } catch (err) {
    console.error("ERROR with newFolderPost: ", err);
    res.status(500).send("Server error");
  }
}

async function editFolderGet(req, res) {
  try {
    const folderId = Number(req.params.folderId);
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    if (!folder) return res.status(404).send("Folder not found.");

    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      orderBy: { id: "asc" },
    });

    res.render("homepage", { errors: [], folders, editingFolder: folder });
  } catch (err) {
    console.error("ERROR with editFolderGet: ", err);
    return res.status(500).send("Server error");
  }
}

async function editFolderPost(req, res) {
  try {
    const folderId = Number(req.params.folderId);
    const name = req.body.name?.trim();

    if (!name) return res.status(400).send("Folder name is required.");

    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId: req.user.id },
    });

    if (!folder) return res.status(404).send("Folder not found.");

    await prisma.folder.update({
      where: { id: folderId },
      data: { name },
    });
    res.redirect("/home");
  } catch (err) {
    console.error("ERROR with editFolderGet: ", err);
    res.status(500).send("Server error");
  }
}

async function readFolder(req, res) {
  try {
    const folderId = Number(req.params.folderId);

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
      include: {
        files: true,
      },
    });
    if (!folder) return res.status(404).send("Folder not found.");
    res.render("folder", { errors: [], folder, files: folder.files });
  } catch (err) {
    console.error("ERROR in readFolder: ", err);
    res.status(500).send("Server error");
  }
}

async function deleteFolder(req, res) {
  try {
    const folderId = Number(req.params.folderId);

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
      include: {
        files: true,
      },
    });

    if (!folder) return res.status(404).send("Folder not found.");

    await prisma.folder.delete({
      where: { id: folderId },
    });
    res.redirect("/home");
  } catch (err) {
    console.error("ERROR with deleteFolder: ", err);
  }
}

async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
}

module.exports = {
  newFolderPost,
  editFolderGet,
  editFolderPost,
  readFolder,
  deleteFolder,
  ensureAuthenticated,
};
