const { checkAll } = require("../../module/oAuth");
const Shops = require("../../model/Shops");

async function upload(req, res) {
  const token = req.headers.authorization;
  const { userId, shopId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);

  const imageUrl = req.files.map((e) => e.location);
  await Shops.findOneAndUpdate(
    { shopOwner: userId, _id: shopId },
    { imageUrl }
  );

  return res.send({ user });
}

module.exports = upload;
