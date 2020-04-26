const mongoose = require("mongoose"); 
const moment = require("moment");
const currentTime = moment().format("YYYY-MM-DD h:mm:ssa")

const etcSchema = new mongoose.Schema({
    title : String,
    contents : String,
    type : String,
    writer : String,
    createdAt : { type: String, default : currentTime},
    updateAt : { type: String, default : null},
    deleted : { type: Boolean, default : false},
    deletedAt : { type : String, default : null},
})

module.exports = mongoose.model("Notices", etcSchema,"Notices");