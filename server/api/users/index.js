const express = require("express");
const controller = require("./controllers");

const router = express.Router();

// example
router.post("/my", controller.myInfo);
router.post("/my/favoritesInsert", controller.favoritesInsert);
router.post("/my/favoritesDelete", controller.favoritesDelete);
router.post("/my/favoritesList", controller.favoritesList);
router.post("/join", controller.join);
router.post("/login", controller.login);

module.exports = router;
