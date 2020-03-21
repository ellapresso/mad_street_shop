const axios = require("axios");

function logout(req, res) {
  const token = req.headers.authorization;
  return axios({
    method: "post",
    url: "https://kapi.kakao.com/v1/user/logout",
    headers: { Authorization: token },
    responseType: "json"
  })
    .then(res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = logout;
