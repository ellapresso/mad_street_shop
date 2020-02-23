const Users = require("../../model/Users");
const tokenChecker = require("../../module/oAuth");
// 회원정보 조회 함수, POST 요청으로 ID 값이 넘어왔을 때 하나의 내용만 불러와서 조회
async function myInfo(req, res) {
  const token = req.headers.authorization;
  const myId = req.body.userId;
  const isUser = await tokenChecker.tokenCheck(token);

  if (isUser !== 200 || !myId) return res.sendStatus(403);

  const myInfo = await Users.findOne({ userId: myId });
  return res.send(myInfo);
}

module.exports = myInfo;
