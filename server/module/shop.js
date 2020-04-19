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

const findShopName = async (shopOwner, ShopName) => {
  const shop = await Shops.findOne(
    { shopOwner, ShopName, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );

  return shop;
};

module.exports.shopDetail = shopDetail;
module.exports.shopUpdate = shopUpdate;
module.exports.findShopID = findShopID;
module.exports.findShopName = findShopName;
