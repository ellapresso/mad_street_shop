const Users = require("../../model/Users");
const axios = require("axios");
const moment = require("moment");
const { logger } = require("../../module/logger");

function kakaoLogin(req, res) {
  const token = req.headers.authorization;

  return axios({
    method: "get",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: { Authorization: token },
    responseType: "json",
  })
    .then(async function (response) {
      const user = response.data;
      const userId = user.id;

      const isUser = await Users.findOne({
        userId,
        isUser: true,
        deleted: false,
      });
      if (!isUser) {
        const userData = {
          kakao: {
            nickname: user.kakao_account.profile.nickname,
            profileLink: user.kakao_account.profile.thumbnail_image_url,
          },
          isUser: false,
          deleted: false,
          createdAt: moment().format("YYYY-MM-DD h:mm:ssa"),
        };
        await Users.findOneAndUpdate({ userId }, userData, { upsert: true });
        logger.log(`로그인 실패 : ${userId}`);
        return res.status(202).send({ isUser: false, userId });
      }

      //새로 로그인 한 경우 새로운 데이터로 저장
      isUser.set("kakao.nickname", user.kakao_account.profile.nickname);
      isUser.set(
        "kakao.profileLink",
        user.kakao_account.profile.thumbnail_image_url
      );
      isUser.save();
      const userInfo = {
        userId: isUser.userId,
        owner: isUser.owner,
        userTags: isUser.userTags,
        favoriteShops: isUser.favoriteShops,
        useProfile: isUser.useProfile,
        kakao: {
          nickname: isUser.kakao.nickname,
          profileLink: isUser.kakao.profileLink,
        },
        isUser: isUser.isUser, //회원가입이전 로그인시 false
        deleted: isUser.deleted, //회원탈퇴시 true
      };
      logger.log(`로그인 성공 : ${userId}`);

      return res.send({ userId, isUser: isUser.isUser, userInfo });
    })
    .catch((err) => {
      console.error(`[login error] ${err}`);
      return res.status(500).send(err.message);
    });
}

module.exports = kakaoLogin;
