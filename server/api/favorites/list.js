const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");

async function list(req, res) {
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

  return res.send(data);
}

module.exports = list;
