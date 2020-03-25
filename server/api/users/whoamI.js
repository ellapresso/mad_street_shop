const Users = require("../../model/Users");
const { checkAll } = require("../../module/oAuth");

async function whoamI(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.body;

  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);
  return res.send(user);
}

module.exports = whoamI;
