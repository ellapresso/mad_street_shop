const { checkAll } = require("../../module/oAuth");
const { shopDetail } = require("../../module/shop");
const fileList = require("../../module/fileList");

async function upload(req, res) {
  const token = req.headers.authorization;
  const { userId, shopId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);

  await fileList(shopId, userId)
    .then((nothing) => shopDetail(shopId))
    .then((result) => res.send(result));
}

module.exports = upload;
