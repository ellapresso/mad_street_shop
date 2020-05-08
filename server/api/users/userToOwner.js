const { makeOwner } = require("../../module/shop");

async function userToOwner(req, res) {
  const { userId } = req.params;

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
    .catch((err) => res.send(err));
}

module.exports = userToOwner;
