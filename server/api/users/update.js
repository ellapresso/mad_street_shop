const { checkAll } = require("../../module/oAuth");

async function updateUser(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);

  //회원정보 수정
}
module.exports = updateUser;
