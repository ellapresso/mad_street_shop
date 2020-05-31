const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const config = require("../config/environment");
const { logger } = require("./logger");

const s3 = new AWS.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mad-street-shop",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: (req, file, cb) => {
      cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
      const { userId, shopId } = req.params;
      logger.log(`이미지 업로드 요청 파일이름 : ${file.originalname}`);
      cb(null, shopId + "_" + userId + "/" + file.originalname);
    },
  }),
});

module.exports = upload;
