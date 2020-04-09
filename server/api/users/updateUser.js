const { checkAll } = require("../../module/oAuth");

async function updateUser(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const { userTags } = req.body;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);

  //TODO: userTag의 유효성검사
  user.userTags = JSON.parse(userTags);
  user.save();

  return res.send(user);
}

module.exports = updateUser;
