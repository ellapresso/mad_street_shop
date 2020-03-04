const express = require("express");

const router = express.Router();

router.post("/insert", require("./insert"));
router.post("/delete", require("./delete"));
router.get("/list", require("./list"));

module.exports = router;
