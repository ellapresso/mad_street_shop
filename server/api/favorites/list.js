const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");
const _ = require("lodash");

async function list(req, res) { 
  const { userId } = req.body;
  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser || !userId) {
    return res.sendStatus(404);
  } else {
    const favoritesList = isUser.favoriteShops;
    const data = []
    for(let i=0; i < favoritesList.length; i++){
      d = await shopDetail(favoritesList[i])
      data.push(d)
    }
    return res.send(data);
  }
}

module.exports = list;
