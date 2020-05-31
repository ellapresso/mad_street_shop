const { findShopID } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");
const deleteFile = require("../../module/deleteFile");
const fileList = require("../../module/fileList");
const Shops = require("../../model/Shops");
const { shopDetail } = require("../../module/shop");
const { logger } = require("../../module/logger");

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

  if (!!body.deleteFiles) {
    const arr = body.deleteFiles.split(",");
    //이미지 삭제
    arr.forEach((i) => {
      deleteFile(i);
      logger.log(`이미지 ${i} 삭제`);
    });
    delete body.deleteFiles;
  }

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

  try {
    await Shops.findOneAndUpdate({ _id: shopId, shopOwner }, body);
    await fileList(shopId, shopOwner)
      .then((nothing) => shopDetail(shopId))
      .then((result) => res.send(result));
  } catch (e) {
    logger.error(e);
    return res.send(e);
  }
}

module.exports = updateShop;
