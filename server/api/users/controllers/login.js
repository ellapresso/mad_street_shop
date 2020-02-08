const Users = require("../model/Users");
const axios = require("axios");

function kakaoLogin(req, res) {
	const token = req.headers.authorization;

	return axios({
		method: "get",
		url: "https://kapi.kakao.com/v2/user/me",
		headers: { Authorization: token },
		responseType: "json"
	})
		.then(async function(response) {
			const user = response.data;
			const userId = user.id;
			//로그인한 유저가 가입된 유저인지(또는 유효한 회원인지) 확인
			const isUser = await Users.findOne({ userId: user.id, isUser: true });
			if (!isUser) {
				const userData = {
					kakao: {
						active: false,
						nickname: user.properties.nickname,
						profileLink: user.properties.thumbnail_image
					}
				};
				//upsert: 가입하지않았지만 이미 정보가 있는 경우 update, 없는경우 insert해준다..
				await Users.findOneAndUpdate({ userId }, userData, { upsert: true });
				return res.status(404).send({ isUser: false, userId });
			}

			//TODO: 데이터 상의후(회원가입 완료후) 다듬어야 함
			//회원일 경우 유저정보 반환
			const userInfo = {
				userId,
				nickname: user.properties.nickname,
				profileLink: user.properties.thumbnail_image,
				isOwner: isUser.owner,
				isUser: true
			};
			//새로 로그인 한 경우 새로운 데이터로 저장
			isUser.set("kakao.nickname", user.properties.nickname);
			isUser.set("kakao.profileLink", user.properties.thumbnail_image);
			isUser.save();

			if (!isUser.kakao.active) {
				userInfo.nickname = isUser.nickname;
			}
			return res.send(userInfo);
		})
		.catch(err => {
			console.error(`[login error] ${err}`);
			return res.status(err.response.status).send(err.response.statusText);
		});
}

module.exports = kakaoLogin;
