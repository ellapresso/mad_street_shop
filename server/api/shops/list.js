const shops = require("../../model/Shops");
const _ = require("lodash");
const { PythagorasEquirectangular } = require("../../module/formula");

async function shopList(req, res) {
  // {현재 위도, 현재 경도, 가게 위도, 가게 경도}
  const { lat, long, type, active } = req.query;
  const range = req.query.range || 10000;

  if (!lat || !long) {
    return res
      .status(404)
      .send("Can not found your location. please enable your GPS");
  }
  const shopActive =
    active === "true" || active === "false" ? { "now.active": active } : null;
  const shopList = await shops.find(shopActive);
  const mainList = shopList.map(e => {
    let { latitude, longitude } = e.now.real_location;
    if (!latitude || !longitude) {
      latitude = e.location.latitude;
      longitude = e.location.longitude;
    }
    return {
      shopId: e._id,
      shopName: e.shopName,
      shopOwner: e.shopOwner,
      now: {
        active: e.now.active,
        latitude: parseFloat(e.now.real_location.latitude),
        longitude: parseFloat(e.now.real_location.longitude),
        real_start_time: e.now.real_start_time,
        set_close_time: e.now.set_close_time
      },
      likeScore: e.likeScore,
      shopTags: e.shopTags,
      ownerComment: e.ownerComment,
      vicinity: PythagorasEquirectangular([lat, long, latitude, longitude])
    };
  });

  const limitResult = mainList.filter(l => {
    return l.vicinity <= range;
  });

  if (limitResult.length < 1) return res.sendStatus(204);

  switch (type) {
    case "main":
      const result = _.sortBy(limitResult, ["vicinity"]);
      return res.send(result);

    case "rank":
      const rankResult = _.sortBy(limitResult, [{ likeScore: "desc" }]);
      return res.send(rankResult);

    default:
      return res.send(limitResult);
  }
}

module.exports = shopList;
