const Users = require("../../model/Users");
const { tokenCheck } = require("../../module/oAuth");

async function whoamI(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.body;

  const isUser = await tokenCheck(token); //kakao 유저인지 확인
  if (isUser !== 200 || !userId) return res.sendStatus(403);

  //TODO: 잘못된 유저아이디 기입시 너무 오래걸림... 503error
  const userInfo = await Users.findOne({ userId }); //가입된 회원인지 확인
  if (!userInfo.isUser) return res.sendStatus(404);

  return res.send(userInfo);
}

module.exports = whoamI;
