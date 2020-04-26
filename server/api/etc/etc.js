const Etc = require("../../model/Etc");

async function list(req, res){
    const { type } = req.query;
    // ntc : 공지사항, faq : 자주하는 질문
    const etcList = await Etc.find({ type:type, deleted : false }, "-type -deleted -deletedAt -__v").sort({'createdAt':-1});
    return res.send(etcList)
}

module.exports = list;