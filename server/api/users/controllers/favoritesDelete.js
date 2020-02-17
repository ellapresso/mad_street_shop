const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');
const _ = require('lodash')

// # users (user 에 있는 fvshops 를 불러줌)
// 관심 매장 설정/ 해지 / 조회
// => 나랑 가까운 순서대로 불러오기

// 해당 기능은 내가 좋아하는 가게를 등록하는 것으로, 배열이 들어올 것이다.
// 배열이 안들어 온다면 각 하나하나 추가 되는 형태로 구현해야 됌
// favoriteShops 에 추가를 해야한다. 
async function favoritesDelete(req, res){
    // 사용자 ID 가 들어오고, shop들의 ID 가 들어있는 List 가 들어옴
    const { userId, shopId } = req.body; 
    // shopId에 대한 검사 유효값 검사가 있어야 할 것 같
    const isUser = await Users.findOne({userId, isUser: true});
    if(!isUser) return res.sendStatus(302); // not used users
    // updateOne의 addToSet 갱신 제한자는 push 갱신 제한자처럼 추가하는 제한자이기는 하지만 중복된 데이터는 추가하지 않는다.
    // 갱신 제한자라는 것은 문서의 부분 갱신을 할 때 매우 효율적으로 수행할 수 있도록 하는 개념. documnet를 변경 추가 삭제 할 때 배열같은 항목에 대한 연산을 하는데 사용될 수 있음
    // To-Do List : 조회기능 만들기 ( add, del 기능에도 추가되어야 하는 부분, ID에 추가된 shopID들을 기반으로 내용을 조회하고 object를 만들어 return 시키게끔 하는 기능 필요)

    const Result = await Users.updateOne({userId : userId},{$pull:{"favoriteShops": shopId}});
    if(!Result){
        return res.sendStatus(302); 
    } else {
        const user = await Users.findOne({userId, isUser: true});
        console.log(user);
        return res.send(Result);
    }

}

module.exports = favoritesDelete;