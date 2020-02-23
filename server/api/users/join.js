const Users = require("../../model/Users");
const Shops = require("../../model/Shops");

async function join(req, res) {
  const { isOwner } = req.params; //owner or user
  if (isOwner !== "owner" || isOwner !== "user") return res.send(403);

  if (isOwner === "owner") {
    //사장님일 경우
  }

  if (isOwner === "user") {
    //회원일 경우
  }
  res.send(isOwner);
  // const {
  //   userId,
  //   isOwner,
  //   nickName,
  //   userTags,
  //   shopName,
  //   shopTags,
  //   openDays,
  //   openTime,
  //   closeTime,
  //   longitude,
  //   latitude,
  //   ownerComment,
  //   useProfile
  // } = req.body;
  // if (!userId || !isOwner || !nickName || !useProfile)
  //   return res.sendStatus(204);
  // const isUser = await Users.findOne({
  //   userId,
  //   isUser: true
  // }); /**회원여부체크 */
  // if (isUser) return res.sendStatus(302);
  // if (isOwner === "true") {
  //   if (!shopName || !shopTags) return sendStauts(204);
  //   const tags = shopTags.replace(/(\s*)/g, "").split(",");
  //   const ownerData = {
  //     owner: true,
  //     nickName,
  //     useProfile,
  //     isUser: true
  //   };
  //   const shopData = {
  //     shopName,
  //     shopOwner: userId,
  //     shopTags: removeSpace(tags),
  //     openDays: openDays || null,
  //     openTime: openTime || null,
  //     closeTime: closeTime || null,
  //     location: {
  //       longitude: longitude || null,
  //       latitude: latitude || null
  //     },
  //     ownerComment: ownerComment || ""
  //   };
  //   await Users.updateOne({ userId, deleted: null }, ownerData, {
  //     upsert: true
  //   }).then(await Shops.create(shopData));
  //   return res.sendStatus(200);
  // } else if (isOwner === "false") {
  //   if (!userTags) res.sendStatus(204);
  //   const tags = userTags.replace(/(\s*)/g, "").split(",");
  //   if (tags.length > 3) return res.sendStatus(206); /** 관심태그 최대 3개 */
  //   const userData = {
  //     owner: false,
  //     nickName,
  //     useProfile,
  //     userTags: removeSpace(tags),
  //     isUser: true
  //   };
  //   await Users.updateOne({ userId, deleted: null }, userData, {
  //     upsert: true
  //   });
  //   return res.sendStatus(200);
  // }
  // return res.sendStatus(500);
}

function removeSpace(arr) {
  /**배열의 빈값 제거 */
  return arr.filter(e => {
    return e !== "";
  });
}

module.exports = join;
