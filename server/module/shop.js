const Shops = require("../model/Shops");
const Users = require("../model/Users");

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

// owner의 userId로 찾음
const ownerDetail = async (shopOwner) => {
  return await Shops.find({ shopOwner, deleted: false });
};

const findShopName = async (shopOwner, ShopName) => {
  const shop = await Shops.findOne(
    { shopOwner, ShopName, deleted: false },
    " -__v -deleted -deletedAt -updatedAt -createdAt"
  );

  return shop;
};

const makeOwner = async (data) => {
  await Shops.create(data)
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
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.shopDetail = shopDetail;
module.exports.shopUpdate = shopUpdate;
module.exports.findShopID = findShopID;
module.exports.ownerDetail = ownerDetail;
module.exports.findShopName = findShopName;
module.exports.makeOwner = makeOwner;
