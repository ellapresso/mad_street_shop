const { shopUpdate,shopDetail } = require("../../module/shop");
const { tokenCheck } = require("../../module/oAuth");
const moment = require('moment')
let cron = require('node-cron')


async function operation(req, res){
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId, openTime, closeTime, long, lat, locationComment } = req.body;
    const isUserToken = await tokenCheck(token);
    if (isUserToken !== 200 || !userId) return res.sendStatus(403);
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner != userId) return res.sendStatus(403);
    let closeTimeSet;
    if (openTime) closeTimeSet = moment().hours(openTime.split(":")[0]).minutes(openTime.split(":")[1]);
    const updateInfo = {
        active : true,
        location : {
            longitude : long,
            latitude: lat,
        },
        locationComment : locationComment,
        openTime : openTime || moment().format('HH:MM'),
        closeTime : closeTime || moment(closeTimeSet).add(8, 'hours').format('HH:MM')
    }
    shopUpdate(shopId, userId, updateInfo)
    .then(cron.schedule(`00 ${updateInfo.closeTime.split(":")[0]} ${updateInfo.closeTime.split(":")[1]} * * *`, shopUpdate(shopId, userId, { active : false })))
    .catch(e => {
        return res.sendStatus(500);
    })

    return res.sendStatus(200);
}

module.exports = operation;
