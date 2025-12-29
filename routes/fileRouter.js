const { Router } = require("express");
const fileController = require("../controllers/fileController");
const fileRouter = Router({ mergeParams: true });
const upload = require("../middleware/uploadMiddleware");

// POST new file
fileRouter.post(
  "/new",
  upload.single("uploaded_file"),
  fileController.newFilePost
);

// GET read file

// GET update file
fileRouter.get("/:fileId/edit", fileController.updateFileGet);
// POST update file
fileRouter.post("/:fileId/edit", fileController.updateFilePost);

// POST delete file
fileRouter.post("/:fileId/delete", fileController.deleteFile);

module.exports = fileRouter;
