const Users = require("../../model/Users");
const { checkAll } = require("../../module/oAuth");
const { shopDetail } = require("../../module/shop");
const { vicinityCalculator } = require("../../module/formula");

async function detail(req, res) {
  const { lat, long } = req.query;
  const { shopId } = req.params;
  const { userId } = req.body;
  const token = req.headers.authorization;
  let uFav = false;
  if (!lat || !long) {
    return res
      .status(404)
      .send("Can not found your location. please enable your GPS");
  }

  if(!userId || !token){
    if (!shopId) return res.send(404);
    const shopInfo = await shopDetail(shopId);
    let addVicinity = vicinityCalculator(lat, long, [shopInfo]);
    if (!addVicinity) return res.send(302);
    return res.send(addVicinity);

  } else {
    const user = await checkAll(userId, token);
    if(!user) return res.sendStatus(403);
    const userInfo = await Users.findOne({ userId, isUser: true });
    if(userInfo.favoriteShops.indexOf(shopId)> -1){
      uFav = true
    };
    if (!shopId) return res.send(404);
    const shopInfo = await shopDetail(shopId);
    let addVicinity = vicinityCalculator(lat, long, [shopInfo]);
    if (!addVicinity) return res.send(302);
    addVicinity[0].isUserFavorite = uFav;
    return res.send(addVicinity[0])
  }
}

module.exports = detail;
