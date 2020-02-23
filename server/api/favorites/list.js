const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");
const _ = require("lodash");

async function list(req, res) {
  const { userId } = req.body;
  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser || !userId) {
    return res.sendStatus(404);
  } else {
    const favoritesList = isUser.favoriteShops;
    //TODO: shopDetail 모듈 사용하여 구현하기
    console.log(await shopDetail("5dbab03d77ff1c02d4b00486"));
    return res.send("result");
  }
}

module.exports = list;
