const express = require('express');
const router = express.Router();

// 공지사항, type : ntc 
// FAQ, type : faq
router.get('/', require("./etc"));

module.exports = router;