const express = require("express");

const router = express.Router();

router.get("/list", require("./list"));
router.get("/:shopId", require("./detail"));
router.put("/:shopId", require("./updateShop"));
router.post("/:shopId/operation", require("./operation"));
router.put("/:shopId/operation", require("./edit"));
router.delete("/:shopId/operation", require("./close"));

module.exports = router;
