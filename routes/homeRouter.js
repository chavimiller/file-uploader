const { Router } = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = Router();

// GET all content
homeRouter.get("/", homeController.showAllContent);

module.exports = homeRouter;
