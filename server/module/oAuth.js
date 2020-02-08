const axios = require("axios");

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

module.exports.tokenCheck = tokenCheck;
