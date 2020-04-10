const { shopDetail } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");

async function updateShop(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  console.log(req);
  console.log(res);
  const {
    userId,
    userName,
    mobile,
    useMobile,
    shopName,
    category, //object
    longitude,
    latitude,
    locationComment,
    openDays, //Array
    openTime,
    closeTime,
    shopComment,
    useKakao,
  } = req.body;
  //body값 안넘어옴.
  console.log(userId);
  const user = await checkAll(userId, token);
  console.log(user);
  if (!user) return res.sendStatus(403);
  const shop = await shopDetail(shopId);

  //회원정보 수정
  return res.send(shop);
}

module.exports = updateShop;
