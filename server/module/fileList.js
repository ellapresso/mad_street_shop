const AWS = require("aws-sdk");
const config = require("../config/environment");
const { logger } = require("./logger");
const Shops = require("../model/Shops");

const s3 = new AWS.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.SECRET,
});

const saveFileList = (shopId, shopOwner) => {
  console.log("요청 가게 아이디 : ", shopId);
  return new Promise(function (resolve, reject) {
    s3.listObjects(
      {
        Bucket: "mad-street-shop",
        Prefix: `${shopId}_${shopOwner}`,
      },
      async function (err, data) {
        if (err) {
          logger.error(err);
        }
        const images = data.Contents.map(
          (e) =>
            `https://mad-street-shop.s3.ap-northeast-2.amazonaws.com/${e.Key}`
        );
        await Shops.findOneAndUpdate(
          { _id: shopId, shopOwner },
          { imageUrl: images }
        );
        logger.log("가게정보 업데이트");
        resolve("resolve");
      }
    );
  });
};

module.exports = saveFileList;
