const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');
const _ = require('lodash')

async function favoritesList(req, res){
    const { userId } = req.body; 
    const isUser = await Users.findOne({userId, isUser: true});
    if(!isUser){
        return res.sendStatus(302);
    } else {
        return res.send(isUser.favoriteShops);
    }
}

module.exports = favoritesList;