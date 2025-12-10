const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = new Router();

// GET new folder
folderRouter.get("/new", folderController.newFolderGet);
// POST new folder
folderRouter.post("/new", folderController.newFolderPost);
// GET edit folder

// POST edit folder

// GET read folder
folderRouter.get("/", folderController.readFolder);

// POST delete folder

module.exports = folderRouter;
