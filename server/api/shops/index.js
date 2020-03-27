const express = require("express");

const router = express.Router();

router.get("/list", require("./list"));
router.get("/:shopId", require("./detail"));
router.post("/:shopId/operation", require("./operation"));

module.exports = router;
