const Notices = require("../../model/Notice");

async function list(req, res){
    const noticeList = await Notices.find({}, "-deleted -deletedAt -__v")
    return res.send(noticeList)
}

module.exports = list;