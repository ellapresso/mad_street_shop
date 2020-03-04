const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");

async function list(req, res) {
  //TODO: 가게정보가 deleted : true이면 , 안나와야됨.
  const { userId } = req.body;
  const data = [];

  if (!userId) return res.sendStatus(404);

  const shops = await Users.findOne({ userId, isUser: true })
    .then(res => res.favoriteShops)
    .catch(err => res.sendStatus(403).send(err));
  if (!shops) return res.sendStatus(302);

  for (const e of shops) {
    data.push(await shopDetail(e));
  }

  //TODO: 디자인에서 만약에, 가게이름,카테고리, 이미지, 거리가 나타난다면 가공해주어야 함.
  return res.send(data);
}

module.exports = list;
