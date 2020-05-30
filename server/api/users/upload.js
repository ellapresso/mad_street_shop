const { checkAll } = require("../../module/oAuth");
const Shops = require("../../model/Shops");
const { shopDetail } = require("../../module/shop");
const fileList = require("../../module/fileList");

async function upload(req, res) {
  const token = req.headers.authorization;
  const { userId, shopId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);

  //TODO: 함수 실행 순서 확인 필요. 리스트가 적용된 상태가 반환되는지 확인.
  Promise.all([fileList(shopId, userId), shopDetail(shopId)]).then((values) =>
    res.send(values[1])
  );
}

module.exports = upload;
