const Shops = require("../model/Shops");

// shopId로 찾음
const shopDetail = async shopId => {
  return await Shops.findOne(
    { _id: shopId, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
};

// owner의 userId로 찾음
const ownerDetail = async shopOwner => {
  return await Shops.find({ shopOwner, deleted: false });
};

module.exports.shopDetail = shopDetail;
module.exports.ownerDetail = ownerDetail;
