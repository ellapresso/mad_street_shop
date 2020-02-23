const express = require("express");

const router = express.Router();

router.post("/insert", require("./insert"));
router.post("/delete", require("./update"));
router.get("/list", require("./list"));

module.exports = router;
