const Shops = require("../model/Shops");
const Users = require("../model/Users");
let cron = require("node-cron");
const { logger } = require("./logger");

const shopDetail = async (shopId) => {
  logger.log(`가게 상세정보 요청 : ${shopId}`);
  return await Shops.findOne(
    { _id: shopId, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
};

const shopUpdate = async (shopId, userId, infoObject) => {
  logger.log(`가게 정보 업데이트 요청 : 유저 ${userId}의 가게 ${shopId}`);
  return await Shops.findOneAndUpdate(
    { _id: shopId, shopOwner: userId },
    { now: infoObject },
    { upsert: true }
  );
};

const setCron = async (updateTime, infoObject) => {
  logger.log(`가게 정보 업데이트 상세 정보 : { 
    예약 시간 : ${updateTime},
    업데이트 예정 정보 : ${infoObject}
  }`);
  return cron.schedule( updateTime,() => {shopUpdate(shopId, userId, { active: false })});
}

const findShopID = async (shopOwner) => {
  logger.log(`가게 아이디 요청 : 유저 ${shopOwner}`);
  const shop = await Shops.find(
    { shopOwner, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
  const arr = [];
  shop.forEach((e) => {
    arr.push(e._id);
  });
  return arr;
};

// owner의 userId로 찾음
const ownerDetail = async (shopOwner) => {
  logger.log(`유저의 가게정보 요청 : 유저 ${shopOwner}`);
  return await Shops.findOne({ shopOwner, deleted: false });
};

const findShopName = async (shopOwner, ShopName) => {
  logger.log(
    `유저의 가게이름으로 상세정보 요청 : 유저 ${shopOwner}의 가게 ${ShopName}`
  );
  const shop = await Shops.findOne(
    { shopOwner, ShopName, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );

  return shop;
};

const makeOwner = async (data) => {
  logger.log(`유저 ${data.shopOwner}의 사장님으로 변환 요청`);
  return await Shops.create(data)
    .then(
      await Users.updateOne(
        { userId: data.shopOwner },
        {
          isUser: true,
          owner: true,
          "kakao.active": data.useKakao,
        },
        { upsert: true }
      ).catch((err) => {
        err;
      })
    )
    .then((res) => res)
    .catch((err) => err);
};

module.exports.shopDetail = shopDetail;
module.exports.shopUpdate = shopUpdate;
module.exports.setCron = setCron;
module.exports.findShopID = findShopID;
module.exports.ownerDetail = ownerDetail;
module.exports.findShopName = findShopName;
module.exports.makeOwner = makeOwner;

