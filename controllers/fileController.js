const prisma = require("../lib/prisma");

async function newFilePost(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const folderId = Number(req.params.folderId);

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId: req.user.id },
      select: { id: true },
    });

    if (!folder) {
      return res.status(404).send("Folder not found.");
    }

    await prisma.files.create({
      data: {
        folder: { connect: { id: folderId } },
        user: { connect: { id: req.user.id } },
        name: req.body.name,
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
    });

    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    console.error("ERROR with newFilePost: ", err);
    res.status(500).send("Could not create file");
  }
}

// need this ? async function readFile(req, res) {}

async function updateFileGet(req, res) {
  try {
    const folderId = Number(req.params.folderId);
    const fileId = Number(req.params.fileId);
    const userId = req.user.id;

    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId },
      include: { files: true },
    });
    if (!folder) return res.status(404).send("Folder not found");

    const editingFile = folder.files.find((f) => f.id === fileId);
    if (!editingFile) return res.status(404).send("File not found");

    res.render("folder", {
      folder,
      files: folder.files,
      editingFileId: fileId,
      editingFile,
    });
  } catch (err) {
    console.error("ERROR with updateFileGet: ", err);
  }
}

async function updateFilePost(req, res) {
  try {
    const folderId = Number(req.params.folderId);
    const fileId = Number(req.params.fileId);
    const userId = req.user.id;

    const newName = (req.body.name || "").trim();
    if (!newName) return res.status(400).send("Name is required");

    const result = await prisma.files.updateMany({
      where: { id: fileId, folderId, userId },
      data: { name: newName },
    });

    if (result.count === 0) return res.status(404).send("File not found");

    res.redirect("/folder/" + folderId);
  } catch (err) {
    console.error("ERROR with updateFilePost: ", err);
    res.status(500).send("Server error");
  }
}

async function deleteFile(req, res) {
  try {
    const folderId = Number(req.params.folderId);
    const fileId = Number(req.params.fileId);
    const userId = req.user.id;

    const file = await prisma.files.findFirst({
      where: {
        id: fileId,
        folderId,
        userId,
      },
    });

    if (!file) return res.status(404).send("File not found.");

    await prisma.files.delete({
      where: { id: fileId },
    });

    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    console.error("ERROR with deleteFile: ", err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  newFilePost,
  updateFileGet,
  updateFilePost,
  deleteFile,
};
