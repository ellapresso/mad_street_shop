const express = require("express");
const router = express.Router();
const upload = require("../../module/uploadFile");

router.get("/whoamI", require("./whoamI"));
router.post("/join/:isOwner", upload.array("files", 11), require("./join"));
router.post("/login", require("./login"));
router.put("/:userId", require("./update"));

module.exports = router;
