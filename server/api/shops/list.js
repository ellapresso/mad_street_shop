const shops = require("../../model/Shops");
const _ = require("lodash");
const { vicinityCalculator } = require("../../module/formula");

async function shopList(req, res) {
  const { lat, long, type, active, search } = req.query;
  const range = req.query.range || 10000;

  if (!lat || !long) {
    return res
      .status(404)
      .send("Can not found your location. please enable your GPS");
  }

  const shopList = (active === "true" || active === "false")? 
    await shops.find({$or:[{"shopName": new RegExp(search)},{"shopTags.item": new RegExp(search)}],"now.active": active, deleted: false},"-deleted -deletedAt -createdAt -updatedAt -__v")
    : await shops.find({$or:[{"shopName": new RegExp(search)}, {"shopTags.item": new RegExp(search)}]},"-deleted -deletedAt -createdAt -updatedAt -__v");

  const mainList = vicinityCalculator(lat, long, shopList);

  const limitResult = mainList.filter(l => {
    return l.vicinity <= range;
  });
  if (limitResult.length < 1) return res.sendStatus(204);

  switch (type) {
    case "main":
      const result = _.sortBy(limitResult, ["vicinity"]);
      return res.send(result);

    case "rank":
      const rankResult = _.sortBy(limitResult, ["likeScore"]);
      _.reverse(rankResult);
      return res.send(rankResult);

    default:
      return res.send(limitResult);
  }
}

module.exports = shopList;
