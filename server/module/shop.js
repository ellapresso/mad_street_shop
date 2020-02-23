const Shops = require("../model/Shops");

async function shopDetail(shopId) {
  return await Shops.findOne({ _id: shopId });
}

module.exports.shopDetail = shopDetail;
