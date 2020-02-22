const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');
const _ = require('lodash')

async function favoritesDelete(req, res){
    const { userId, shopId } = req.body; 
    const isShop = await Shops.findOne({_id : shopId});
    if(!isShop) return res.sendStatus(302); 
    const isUser = await Users.findOne({userId, isUser: true});
    if(!isUser) return res.sendStatus(302); 
    const Result = await Users.updateOne({userId : userId},{$pull:{"favoriteShops": shopId}});
    if(!Result){
        return res.sendStatus(302); 
    } else {
        return res.send(isUser.favoriteShops);
    }

}

module.exports = favoritesDelete;