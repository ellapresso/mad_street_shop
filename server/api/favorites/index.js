const express = require("express");

const router = express.Router();

router.post("/", require("./insert"));
router.delete("/", require("./delete"));
router.get("/", require("./list"));

module.exports = router;
