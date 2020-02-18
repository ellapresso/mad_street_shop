const express = require("express");
const controller = require("./controllers");

const router = express.Router();

// example
router.get("/", controller.list);

module.exports = router;
