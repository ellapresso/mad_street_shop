const Users = require("../../model/Users");
const Shops = require("../../model/Shops");
const { isUser, isUserYet } = require("../../module/oAuth");

async function join(req, res) {
  const { isOwner } = req.params; //owner or user
  const types = ["owner", "user"];
  if (types.indexOf(isOwner) === -1) return res.sendStatus(403);

  if (await isUser(req.body.userId)) {
    return res.status(302).send("이미 가입되어있는 사용자 입니다.");
  } else if (!(await isUserYet(req.body.userId))) {
    return res.status(404).send("카카오 로그인을 먼저해주세요");
  }

  if (isOwner === "owner") {
    //사장님 가입
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

    await Shops.create({
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
    })
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
    //일반회원 가입
    const { nickName, userId, useKakao, category } = req.body;
    await Users.updateOne(
      { userId, isUser: false },
      {
        nickName,
        isUser: true,
        owner: false,
        "kakao.active": useKakao,
        userTags: JSON.parse(category)
      },
      { upsert: true }
    )
      .then(res.sendStatus(200))
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

function removeSpace(arr) {
  /**배열의 빈값 제거 */
  return arr.filter(e => {
    return e !== "";
  });
}

module.exports = join;
