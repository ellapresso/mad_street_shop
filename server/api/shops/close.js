const shops = require("../../model/Shops");
const { tokenCheck } = require("../../module/oAuth");
const { shopDetail } = require("../../module/shop");

async function close(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId } = req.body;
    const isUserToken = await tokenCheck(token);
    if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner !== userId){
        return res.sendStatus(406);
    }
    const updateInfo = {
        active : false
    }
    await shops.findOneAndUpdate({ _id: shopId },{ now : updateInfo },{ upsert: true });
    
    const shopInfo2 = await shopDetail(shopId);

    return res.send(shopInfo2)  
}

module.exports = close;