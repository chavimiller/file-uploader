const prisma = require("../lib/prisma");

async function newFileGet(req, res) {
  try {
  } catch (err) {}
}

async function newFilePost(req, res) {}

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
