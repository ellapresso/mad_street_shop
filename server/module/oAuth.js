const axios = require("axios");
const User = require("../model/Users");
const { logger } = require("./logger");

const tokenCheck = (token) => {
  if (!token) return 403;
  return axios({
    methoe: "get",
    url: "https://kapi.kakao.com/v1/user/access_token_info",
    headers: { Authorization: token },
    responseType: "json",
  })
    .then((response) => {
      logger.log(`토큰확인요청성공 : ${response.statusText}`);
      return response.data.id;
    })
    .catch((err) => {
      logger.error(`토큰확인요청실패 : ${err.response.data.msg}`);
      return err;
    });
};

const isUser = async (userId) => {
  const user = await User.findOne(
    { userId, isUser: true, deleted: false },
    "-__v"
  ).catch((err) => err);
  //유저일 경우 유저데이터, 아닐결우 null을 반환 함.
  return user;
};

const isUserYet = async (userId) => {
  const user = await User.findOne(
    { userId, deleted: false },
    "-_id -__v"
  ).catch((err) => err);
  if (user.isUser) {
    logger.debug("토큰확인 필요");
    return 401;
  }
  logger.log("유저를 찾을수 없음");
  return;
};

const checkAll = async (userId, token) => {
  logger.log(`${userId}의 요청 토큰값 : ${token}`);
  const user = await isUser(userId);
  const tokenChk = await tokenCheck(token);

  if (user && tokenChk == userId) {
    return user;
  } else {
    return null;
  }
};

module.exports.tokenCheck = tokenCheck;
module.exports.isUser = isUser;
module.exports.isUserYet = isUserYet;
module.exports.checkAll = checkAll;
