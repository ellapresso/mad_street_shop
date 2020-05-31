const { checkAll } = require("../../module/oAuth");

const { ownerDetail } = require("../../module/shop");

async function whoamI(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);

  if (user.owner) {
    const shop = await ownerDetail(userId);
    shop.useMobile ? "" : (shop.mobile = "비공개");
    delete shop.__v;
    return res.send({ user, shop });
  }
  return res.send({ user });
}

module.exports = whoamI;
