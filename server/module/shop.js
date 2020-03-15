const Shops = require("../model/Shops");

const shopDetail = async shopId => {
  return await Shops.findOne(
    { _id: shopId, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );
};

module.exports.shopDetail = shopDetail;