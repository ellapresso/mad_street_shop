const Users = require("../../model/Users");
const { shopDetail } = require("../../module/shop");
const { PythagorasEquirectangular } = require("../../module/formula");
const _ = require("lodash");

async function list(req, res) {
  //TODO: 가게정보가 deleted : true이면 , 안나와야됨.
  // => shop 정보를 받아오는 곳에서 deleted가 true면 안나오도록
  const { lat, long } = req.query;
  const { userId } = req.body;
  const data = [];
  if (!userId) return res.sendStatus(404);

  const shops = await Users.findOne({ userId, isUser: true })
    .then(res => res.favoriteShops)
    .catch(err => res.sendStatus(403).send(err));
  if (!shops) return res.sendStatus(302);
  for (const e of shops) {
    // data push 이전에 deleted 값이 true인지 false 인지 판단하는 과정이 필요
    item = await shopDetail(e);
    if (item.deleted !== true) {
      data.push(item);
    }
  }
  //TODO: 디자인에서 만약에, 가게이름,카테고리, 이미지, 거리가 나타난다면 가공해주어야 함.
  // 쿼리 스트링으로 주소(A,B)를 받게 되면 관심 리스트 거리 순으로
  // 입력거리 없으면, 기존 그대로
  if (!lat || !long) {
    console.log(data);
    return res.send(data);
  } else {
    // nsd : not sort distance
    const nsd = data.map(d => {
      return {
        location: {
          latitude: parseFloat(d.location.latitude),
          longitude: parseFloat(d.location.longitude)
        },
        now: d.now,
        openDays: d.openDays,
        openTime: d.openTime,
        closeTime: d.closeTime,
        ownerComment: d.ownerComment,
        likeScore: d.likeScore,
        imageUrl: d.imageUrl,
        shopName: d.shopName,
        shopOwner: d.shopOwner,
        shopTags: d.shopTags,
        vicinity: PythagorasEquirectangular([
          lat,
          long,
          d.location.latitude,
          d.location.longitude
        ])
      };
    });
    const distanceList = _.sortBy(nsd, ["vicinity"]);
    return res.send(distanceList);
  }
}

module.exports = list;
