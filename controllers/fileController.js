const prisma = require("../lib/prisma");

async function newFileGet(req, res) {
  try {
  } catch (err) {}
}

async function newFilePost(req, res) {
  try {
    const folderId = Number(req.params.folderId);

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      select: { userId: true },
    });

    if (!folder) {
      return res
        .status(403)
        .send("You do not have the authorization to make these changes.");
    }

    await prisma.files.create({
      data: {
        folder: { connect: { id: folderId } },
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
    res.render("uploadFile", { data: data }); // something like this
  } catch (err) {
    console.error("ERROR with updateFileGet: ", err);
  }
}

async function updateFilePost(req, res) {
  const fileId = Number(req.params.id);
  const userId = req.user.id;
  try {
    const file = await prisma.files.findUnique({
      where: {
        id: fileId,
      },
    });

    if (file.userId !== userId) {
      return res.status(500).send("Not authorized to make changes");
    }

    await prisma.files.update({
      where: {
        id: fileId,
      },
      data: {
        name: req.body.name,
        fileContent: req.body.fileContent,
      },
    });

    res.redirect("/folder/" + folderId);
  } catch (err) {
    console.error("ERROR with updateFilePost: ", err);
    res.status(500).send("Server error");
  }
}

async function deleteFile(req, res) {}

module.exports = {
  newFileGet,
  newFilePost,
  updateFileGet,
  updateFilePost,
  deleteFile,
};
