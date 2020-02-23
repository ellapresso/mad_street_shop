const Users = require("../../model/Users");
const tokenChecker = require("../../module/oAuth");

async function whoamI(req, res) {
  const token = req.headers.authorization;
  const myId = req.body.userId;
  const isUser = await tokenChecker.tokenCheck(token);

  if (isUser !== 200 || !myId) return res.sendStatus(403);

  const myInfo = await Users.findOne({ userId: myId });
  return res.send(myInfo);
}

module.exports = whoamI;
