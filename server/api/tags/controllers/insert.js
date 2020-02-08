/** 이 파일은 데이터를 집어넣기 위해 임의로 만든 파일이며, tags 관련 api는 get만 허용한다. */
const Tags = require("../model/Tags");

async function insert(req, res) {
	const bulkText = req.body.tags;
	const tests = bulkText.split("/");

	const result = tests.map(async e => {
		console.log(typeof e);
		const word = JSON.parse(e);
		return await Tags.create(word);
	});
	return res.send(result);
}

module.exports = insert;
