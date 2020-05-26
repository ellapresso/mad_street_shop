const AWS = require("aws-sdk");
const config = require("../config/environment");
const { logger } = require("./logger");

const s3 = new AWS.S3({
  accessKeyId: config.aws.ID,
  secretAccessKey: config.aws.SECRET,
});

const fileList = (Prefix) => {
  s3.listObjects(
    {
      Bucket: "mad-street-shop",
      Prefix,
    },
    function (err, data) {
      if (err) {
        logger.error(err);
      }
      console.log(data);
      const images = data.Contents.map(
        (e) =>
          `https://mad-street-shop.s3.ap-northeast-2.amazonaws.com/${e.Key}`
      );
      // console.log(`${images}`);
      console.log(images);

      // 여기서는 잘 나오는데 밖에서는 안나옴.
      // 처리가 늦어서 이 함수가 끝난다음에 값을 가지고 나와야 함.
    }
  );
};

module.exports = fileList;
