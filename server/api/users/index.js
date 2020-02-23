const express = require("express");
const router = express.Router();

router.post("/whoamI", require("./whoamI"));
router.post("/join", require("./join"));
router.post("/login", require("./login"));

module.exports = router;
