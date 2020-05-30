const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const config = require("../config/environment");
const { logger } = require("./logger");

const s3 = new AWS.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.SECRET,
});

const deleteFile = (keys) => {
  const params = {
    Bucket: "mad-street-shop",
    Key: keys,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      logger.error(err);
    }
    logger.log(`${keys} 삭제 완료`);
  });
};

module.exports = deleteFile;
