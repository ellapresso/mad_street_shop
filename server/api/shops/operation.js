const shops = require("../../model/Shops");
const { shopDetail } = require("../../module/shop");

async function operation(req, res){
    // 이제 실행 되는 것을 
    const token = req.headers.authorization;
    const { shopId } = req.params;
    const { userId, openTime, closeTime, long, lat, locationComment } = req.body;
    const shopInfo = await shopDetail(shopId);
    if (shopInfo.shopOwner !== userId){
        return res.sendStatus(406); // 올바르지 않은 컨텐츠 접근    
    }
    
    // 1. 사장님 아이디로 가게를 식별한다.
    // 2. 해당 점포의 now 정보를 바꾼다.
    //  2-0. active를 true 로 변경
    //  2-1. default 시간 값으로는 시작시간은 현재시간, 종료 시간은 현재시간 +8 시간 이다.
    //  2-2. 사용자의 위도, 경도 정보를 받아와서 등록한다.
    //  2-3. 상세위치정보를 작성한다.
    return res.send(shopInfo)
}

module.exports = operation;
