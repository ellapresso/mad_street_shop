// 공지사항 모델 작성
const mongoose = require("mongoose"); 
const moment = require("moment"); // 작성 시간, 수정 시간 표기용
const currentTime = moment().format("YYYY-MM-DD h:mm:ssa")

// 제목, 내용, 작성일, 
const NoticeSchema = new mongoose.Schema({
    title : String,
    contents : String,
    writer : String,
    createdAt : { type: String, default : currentTime},
    updateAt : { type: String, default : null},
    deleted : { type: Boolean, default : false},
    deletedAt : { type : String, default : null},
})

module.exports = mongoose.model("Notices", NoticeSchema,"Notices");