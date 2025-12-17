const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// POST new folder
folderRouter.post("/new", folderController.newFolderPost);
// GET edit folder

// POST edit folder

// GET read folder
folderRouter.get(
  "/:id",
  folderController.ensureAuthenticated,
  folderController.readFolder
);

// POST delete folder

module.exports = folderRouter;
