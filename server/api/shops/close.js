const { tokenCheck } = require("../../module/oAuth");
const { shopUpdate,shopDetail } = require("../../module/shop");

async function operationClose(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId } = req.body;
    const isUserToken = await tokenCheck(token);
    if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner != userId) return res.sendStatus(403);
    const updateInfo = {
        active : false,
    }
    shopUpdate(shopId, userId, updateInfo).catch(e => {
        return res.sendStatus(500);
    })
    return res.sendStatus(200)  
}

module.exports = operationClose;