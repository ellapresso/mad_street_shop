// 수정 하는 내용은 해당 내용을 업데이트 하기만 하면 된다.
const shops = require("../../model/Shops");
const { tokenCheck } = require("../../module/oAuth");
const { shopUpdate,shopDetail } = require("../../module/shop");

async function edit(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId, closeTime } = req.body;
    const isUserToken = await tokenCheck(token);
    if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner != userId) return res.sendStatus(403);
    shopData = shopInfo.now;
    const updateInfo = {
        active : shopData.active,
        location : shopData.location,
        locationComment : shopData.locationComment,
        openTime : shopData.openTime,
        closeTime : closeTime
    }
    shopUpdate(shopId, userId, updateInfo).catch(e => {
        return res.sendStatus(500);
    })
    return res.sendStatus(200)
}

module.exports = edit;