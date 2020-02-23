const express = require("express");
const router = express.Router();

router.get("/whoamI", require("./whoamI"));
router.post("/join/:isOwner", require("./join"));
router.post("/login", require("./login"));

module.exports = router;
