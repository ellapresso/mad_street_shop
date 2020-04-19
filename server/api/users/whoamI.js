const { checkAll } = require("../../module/oAuth");

const { ownerDetail } = require("../../module/shop");

async function whoamI(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.body;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);
  if (user.owner) {
    const shop = await ownerDetail(userId);
    return res.send({ user, shop });
  }
  return res.send({ user });
}

module.exports = whoamI;
