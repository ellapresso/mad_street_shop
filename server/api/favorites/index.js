const express = require("express");

const router = express.Router();

router.post("/:userId/", require("./insert"));
router.delete("/:userId/", require("./delete"));
router.get("/:userId/", require("./list"));

module.exports = router;
