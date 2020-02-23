const Shops = require("../model/Shops");

const shopDetail = async shopId => {
  return await Shops.findOne({ _id: shopId });
};

module.exports.shopDetail = shopDetail;
