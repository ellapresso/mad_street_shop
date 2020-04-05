const { shopUpdate,shopDetail } = require("../../module/shop");
const { tokenCheck } = require("../../module/oAuth");


async function operation(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId, openTime, closeTime, long, lat, locationComment } = req.body;
    const isUserToken = await tokenCheck(token);
    if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner != userId) return res.sendStatus(403);
    const updateInfo = {
        active : true,
        location : {
            longitude : long,
            latitude: lat,
        },
        locationComment : locationComment,
        openTime : openTime,
        closeTime : closeTime
    }
    shopUpdate(shopId, userId, updateInfo).catch(e => {
        return res.sendStatus(500);
    })
    return res.sendStatus(200)
}

module.exports = operation;
