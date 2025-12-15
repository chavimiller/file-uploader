const { Router } = require("express");
const fileController = require("../controllers/fileController");
const fileRouter = Router({ mergeParams: true });
const upload = require("../middleware/uploadMiddleware");

// GET new file
fileRouter.get("/new", fileController.newFileGet);

// POST new file
fileRouter.post(
  "/new",
  upload.single("uploaded_file"),
  fileController.newFilePost
);

// GET read file

// GET update file

// POST update file

// POST delete file

module.exports = fileRouter;
