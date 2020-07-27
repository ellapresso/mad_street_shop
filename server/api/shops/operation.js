const { shopUpdate, shopDetail, setCron } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");
const moment = require("moment");
const { logger } = require("../../module/logger");

async function operation(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  const {
    userId,
    openTime,
    closeTime,
    longitude,
    latitude,
    locationComment,
    subLocation,
  } = req.body;
  const user = await checkAll(userId, token);
  const shopInfo = await shopDetail(shopId);
  if (!user || shopInfo.shopOwner !== userId) return res.sendStatus(403);

  let closeTimeSet;
  if (openTime)
    closeTimeSet = moment()
      .hours(openTime.split(":")[0])
      .minutes(openTime.split(":")[1]);
  const updateInfo = {
    active: true,
    location: {
      longitude,
      latitude,
      subLocation,
    },
    locationComment: locationComment,
    openTime: openTime || moment().format("HH:MM"),
    closeTime:
      closeTime || moment(closeTimeSet).add(8, "hours").format("HH:MM"),
  };

  logger.log(`운영 시작 : ${updateInfo}`);

  shopUpdate(shopId, userId, updateInfo)
    .then(
      setCron(
        `00 ${updateInfo.closeTime.split(":")[1]} ${
          updateInfo.closeTime.split(":")[0]
        } * * *`,
        updateInfo
      )
    )
    .catch((e) => {
      logger.error(`운영 에러 ${e}`);
      return res.sendStatus(500);
    });
  return res.send(updateInfo);
}

module.exports = operation;
