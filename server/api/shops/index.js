const express = require("express");
const controller = require("./controllers");

const router = express.Router();

// example
router.get("/", controller.list);
router.get("/:shopId", controller.detail);

module.exports = router;
