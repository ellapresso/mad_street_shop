const { findShopID } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");
const deleteFile = require("../../module/deleteFile");
const Shops = require("../../model/Shops");

async function updateShop(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  const shopOwner = req.body.userId;
  const { body } = req;

  const user = await checkAll(shopOwner, token);
  if (!user) return res.sendStatus(403);

  const findShopId = await findShopID(shopOwner);
  const shops = findShopId.map((e) => e.toString());

  const hasShop = shops.indexOf(shopId);

  if (hasShop < 0) return res.sendStatus(403);

  //location object
  if (!!body.longitude && !!body.latitude) {
    body.location = { longitude: body.longitude, latitude: body.latitude };
    delete body.latitude;
    delete body.longitude;
  }
  if (!!body.subLocation) {
    body.location.subLocation = body.subLocation;
    delete body.subLocation;
  }

  //이미지 삭제
  deleteFile("undefined_1211128092/IMG_2020-05-09-09220326.jpg");

  await Shops.findOneAndUpdate({ _id: shopId, shopOwner }, body)
    .then(res.sendStatus(200))
    .catch((err) => res.send(err));
}

module.exports = updateShop;
