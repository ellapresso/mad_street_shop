const express = require("express");

const router = express.Router();

router.post("/list", require("./list"));
router.post("/detail", require("./detail"));

module.exports = router;
