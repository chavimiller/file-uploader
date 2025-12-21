const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// POST new folder
folderRouter.post("/new", folderController.newFolderPost);
// GET edit folder
folderRouter.get("/:folderId/edit", folderController.editFolderGet);
// POST edit folder
folderRouter.post("/:folderId/edit", folderController.editFolderPost);
// GET read folder
folderRouter.get(
  "/:folderId",
  folderController.ensureAuthenticated,
  folderController.readFolder
);

// POST delete folder
folderRouter.post(
  "/:folderId/delete",
  folderController.ensureAuthenticated,
  folderController.deleteFolder
);

module.exports = folderRouter;
