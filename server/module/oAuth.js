const axios = require("axios");
const User = require("../model/Users");
const tokenCheck = token => {
  if (!token) return 403;
  return axios({
    methoe: "get",
    url: "https://kapi.kakao.com/v1/user/access_token_info",
    headers: { Authorization: token },
    responseType: "json"
  })
    .then(response => {
      console.log("토큰확인요청성공 : ", response.statusText);
      return 200;
    })
    .catch(err => {
      console.log("토큰확인요청실패 : ", err.response.data.msg);
      return 403;
    });
};

const isUser = async userId => {
  const user = await User.findOne(
    { userId, isUser: true, deleted: false || null },
    "-__v"
  );

  //유저일 경우 유저데이터, 아닐결우 null을 반환 함.
  return user;
};

const isUserYet = async userId => {
  const user = await User.findOne(
    { userId, isUser: false, deleted: false || null },
    "-_id -__v"
  );

  //데이터는 있지만 가입절차가 진행되지 않은 유저일 경우 유저데이터, 아닐결우 null을 반환 함.
  return user;
};

module.exports.tokenCheck = tokenCheck;
module.exports.isUser = isUser;
module.exports.isUserYet = isUserYet;
