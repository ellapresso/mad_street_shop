const Users = require("../../model/Users");
const Shops = require("../../model/Shops");

async function join(req, res) {
  //TODO: 필수값 체크, 중복데이터 체크
  const { isOwner } = req.params; //owner or user
  const types = ["owner", "user"];

  if (types.indexOf(isOwner) === -1) return res.sendStatus(403);

  if (isOwner === "owner") {
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
      useKakao
    } = req.body;

    const imageUrl = req.files.map(e => e.location);

    const shopData = {
      shopName,
      shopOwner: userId,
      mobile,
      useMobile,
      shopTags: JSON.parse(category),
      openDays,
      openTime,
      closeTime,
      location: {
        longitude: longitude || null,
        latitude: latitude || null
      },
      locationComment,
      ownerComment: shopComment || "",
      imageUrl
    };

    //TODO: shop정보 등록에 성공하면, 회원가입여부를 true로 변경할 것.
    await Shops.create(shopData)
      .then(
        await Users.updateOne(
          { userId, isUser: false },
          {
            isUser: true,
            useProfile: useKakao,
            owner: true
          },
          { upsert: true }
        )
          .then(res.sendStatus(200))
          .catch(err => res.status(500).send(err))
      )
      .catch(err => {
        res.status(500).send(err);
      });
  }

  if (isOwner === "user") {
    console.log(isOwner);
    //회원일 경우

    const { userName, category, useKakao } = req.body;
  }
}

function removeSpace(arr) {
  /**배열의 빈값 제거 */
  return arr.filter(e => {
    return e !== "";
  });
}

module.exports = join;
