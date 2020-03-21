const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");
const { vicinityCalculator } = require("../../module/formula");
const { checkAll } = require("../../module/oAuth");
const _ = require("lodash");

async function list(req, res) {
  const token = req.headers.authorization;
  const { lat, long } = req.query;
  const { userId } = req.body;
  const data = [];

  const user = await checkAll(userId, token);

  const shops = await Users.findOne({ userId, isUser: true })
    .then(res => res.favoriteShops)
    .catch(err => res.sendStatus(403).send(err));
  if (!shops) return res.sendStatus(302);

  for (const e of shops) {
    data.push(await shopDetail(e));
  }

  if (lat || long) {
    const list = _.sortBy(vicinityCalculator(lat, long, data), ["vicinity"]);
    return res.send(list);
  }
  return res.send(data);
}

module.exports = list;
