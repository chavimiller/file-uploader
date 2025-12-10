const { Router } = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = new Router();

// GET all content
homeRouter.get("/", homeController.showAllContent);

module.exports = homeRouter;
