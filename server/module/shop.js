const Shops = require("../model/Shops");

const shopDetail = async (shopId) => {
  return await Shops.findOne(
    { _id: shopId, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
};

const shopUpdate = async (shopId, userId, infoObejct) => {
  return await Shops.findOneAndUpdate(
    { _id: shopId, shopOwner: userId },
    { now: infoObejct },
    { upsert: true }
  );
};

const findShopID = async (shopOwner) => {
  return await Shops.findOne(
    { shopOwner, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
};
module.exports.shopDetail = shopDetail;
module.exports.shopUpdate = shopUpdate;
module.exports.findShopID = findShopID;
