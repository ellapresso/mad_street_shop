const express = require("express");
const router = express.Router();

router.get("/", require("./list"));

module.exports = router;
