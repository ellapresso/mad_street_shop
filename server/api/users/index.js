const express = require("express");
const controller = require("./controllers");

const router = express.Router();

// example
router.post("/my", controller.myInfo);
router.post("/my/fvShops", controller.fvShops);
router.post("/join", controller.join);
router.post("/login", controller.login);

module.exports = router;
