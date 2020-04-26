const Notices = require("../../model/Notice");

async function detail(req, res) {
  const { noticeId } = req.params;
  const noticeInfo = await Notices.findOne({_id : noticeId}, "-deleted -deletedAt -__v")
  if (!noticeInfo) return res.send(302);
  return res.send(noticeInfo);
}

module.exports = detail;
