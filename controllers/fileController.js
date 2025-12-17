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
  newFilePost,
  updateFileGet,
  updateFilePost,
  deleteFile,
};
