// 수정 하는 내용은 해당 내용을 업데이트 하기만 하면 된다.
const shops = require("../../model/Shops");
const { tokenCheck } = require("../../module/oAuth");
const { shopDetail } = require("../../module/shop");

async function edit(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId, closeTime } = req.body;
    const isUserToken = await tokenCheck(token);
      if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner !== userId){
        return res.sendStatus(406);
    }
    await shops.findOneAndUpdate({ _id: shopId },{"now.closeTime" : closeTime},{ upsert: true });
    const shopInfo2 = await shopDetail(shopId);
    return res.send(shopInfo2)
}

module.exports = edit;