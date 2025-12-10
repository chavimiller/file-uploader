// const db = require("../?")

async function newFolderGet() {
  try {
  } catch (error) {}
}

async function newFolderPost() {}

async function editFolderGet() {}

async function editFolderPost() {}

async function readFolder(req, res) {
  try {
    res.render("folder", { errors: [] });
  } catch (err) {
    console.error("ERROR in readFolder: ", err);
    res.status(500).send("Server error");
  }
}

async function deleteFolder() {}

module.exports = {
  newFolderGet,
  newFolderPost,
  editFolderGet,
  editFolderPost,
  readFolder,
  deleteFolder,
};
