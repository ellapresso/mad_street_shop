const express = require("express");
const router = express.Router();

router.post("/my", require("./myInfo"));
router.post("/join", require("./join"));
router.post("/login", require("./login"));

module.exports = router;
