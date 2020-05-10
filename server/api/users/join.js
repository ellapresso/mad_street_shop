const Users = require("../../model/Users");
const { isUserYet, checkAll, tokenCheck } = require("../../module/oAuth");
const { makeOwner } = require("../../module/shop");
const { logger } = require("../../module/logger");

async function join(req, res) {
  const { isOwner } = req.params; //owner or user
  const types = ["owner", "user"];
  if (types.indexOf(isOwner) === -1) return res.sendStatus(403);
  const token = req.headers.authorization;
  const { userId } = req.body;
  const user = await checkAll(userId, token);

  //TODO :토큰 체크 및 본인인증 수정필요
  if (!!user) {
    return res.status(302).send("이미 가입되어있는 사용자 입니다.");
  } else if ((await isUserYet(userId)) === 401) {
    return res.sendStatus(401);
  }

  if (isOwner === "owner") {
    logger.log(`사장님 회원가입 요청 : ${userId}`);
    //사장님 가입
    const {
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

    const data = {
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
        latitude: latitude || null,
      },
      locationComment: locationComment || "",
      ownerComment: shopComment || "",
    };

    return await makeOwner(data)
      .then(res.sendStatus(200))
      .catch((err) => res.send(err)); //TODO:수정 필요함.
  }

  if (isOwner === "user") {
    logger.log(`일반 회원가입 요청 : ${userId}`);
    //일반회원 가입
    await Users.updateOne(
      { userId, isUser: false },
      {
        isUser: true,
        owner: false,
        userTags: JSON.parse(req.body.category),
      },
      { upsert: true }
    )
      .then(res.sendStatus(200))
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}

module.exports = join;
