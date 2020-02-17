const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');
const _ = require('lodash')

// # users (user 에 있는 fvshops 를 불러줌)
// 관심 매장 설정/ 해지 / 조회
// => 나랑 가까운 순서대로 불러오기

// 해당 기능은 내가 좋아하는 가게를 등록하는 것으로, 배열이 들어올 것이다.
// 배열이 안들어 온다면 각 하나하나 추가 되는 형태로 구현해야 됌
// favoriteShops 에 추가를 해야한다. 
async function favoritesList(req, res){
    // 사용자 ID 가 들어오고, shop들의 ID 가 들어있는 List 가 들어옴
    const { userId } = req.body; 
    // shopId에 대한 검사 유효값 검사가 있어야 할 것 같
    const isUser = await Users.findOne({userId, isUser: true});
    if(!isUser){
        return res.sendStatus(302);
    } else {
        console.log(isUser);
        console.log(isUser.favoriteShops)
        return res.send(isUser.favoriteShops);
    }
}

module.exports = favoritesList;