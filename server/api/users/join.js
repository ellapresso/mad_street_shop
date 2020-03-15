const Users = require("../../model/Users");
const Shops = require("../../model/Shops");
const { isUser, isUserYet } = require("../../module/oAuth");

async function join(req, res) {
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

    if (await isUser(userId)) {
      return res.status(302).send("이미 가입되어있는 사용자 입니다.");
    } else if (!(await isUserYet(userId))) {
      return res.status(404).send("카카오 로그인을 먼저해주세요");
    }
    if (
      !userName ||
      !mobile ||
      !useMobile ||
      !shopName ||
      !category ||
      !longitude ||
      !latitude ||
      !openDays ||
      !openTime ||
      !closeTime ||
      !useKakao
    ) {
      res.status(400).send("입력 필수값을 확인해주세요");
    }

    const imageUrl = req.files.map(e => e.location);

    const shopData = {
      shopName,
      shopOwner: userId,
      ownerName: userName,
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
      locationComment: locationComment || "",
      ownerComment: shopComment || "",
      imageUrl
    };

    await Shops.create(shopData)
      .then(
        await Users.updateOne(
          { userId, isUser: false },
          {
            isUser: true,
            owner: true,
            "kakao.active": useKakao
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
