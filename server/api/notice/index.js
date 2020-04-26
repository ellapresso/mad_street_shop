const express = require('express');
const router = express.Router();

// 게시글 전체 보기
router.get('/', require("./list"));
router.get('/:noticeId', require("./details"));

module.exports = router;