const { checkAll } = require("../../module/oAuth");
const { shopUpdate, shopDetail } = require("../../module/shop");


async function operationClose(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId } = req.body;
    const user = await checkAll(userId, token);
    if(!user) return res.sendStatus(403)
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner != userId) return res.sendStatus(403);
    const updateInfo = {
        active : false,
    }
    const beforeInfo = shopInfo.now;
    shopUpdate(shopId, userId, updateInfo).catch(e => {
        return res.sendStatus(500);
    })
    return res.send(beforeInfo); 
}

module.exports = operationClose;