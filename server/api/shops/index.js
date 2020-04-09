const express = require("express");

const router = express.Router();

router.get("/list", require("./list"));
router.get("/:shopId", require("./detail"));
router.put("/:shopId", require("./updateShop"));

module.exports = router;
