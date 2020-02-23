const express = require("express");

const router = express.Router();

router.get("/list", require("./list"));
router.get("/:shopId", require("./detail"));

module.exports = router;
