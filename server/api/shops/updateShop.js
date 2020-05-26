const { findShopID } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");
const deleteFile = require("../../module/deleteFile");
const Shops = require("../../model/Shops");
const AWS = require("aws-sdk");
const config = require("../../config/environment");
const { logger } = require("../../module/logger");

const s3 = new AWS.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.SECRET,
});

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
    for (i in arr) {
      deleteFile(i);
      logger.log(`이미지 ${i} 삭제`);
    }

    delete body.deleteFiles;

    s3.listObjects(
      {
        Bucket: "mad-street-shop",
        Prefix: `${shopId}_${shopOwner}`,
      },
      function (err, data) {
        if (err) {
          logger.error(err);
        }
        const images = data.Contents.map(
          (e) =>
            `https://mad-street-shop.s3.ap-northeast-2.amazonaws.com/${e.Key}`
        );
        body.imageUrl = images;
      }
    );
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

  await Shops.findOneAndUpdate({ _id: shopId, shopOwner }, body)
    .then(res.sendStatus(200))
    .catch((err) => res.send(err));
}

module.exports = updateShop;
