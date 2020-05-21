const express = require("express");
const router = express.Router();
const upload = require("../../module/uploadFile");

router.get("/:userId/whoamI", require("./whoamI"));
router.post("/join/:isOwner", require("./join"));
router.put(
  "/upload-img/:userId/:shopId",
  upload.array("files", 11),
  require("./upload")
);
router.post("/login", require("./login"));
router.post("/logout", require("./logout"));
router.delete("/:userId/leave", require("./leave"));
router.put("/:userId", require("./updateUser"));
router.put("/:userId/user-to-owner", require("./userToOwner"));

module.exports = router;
