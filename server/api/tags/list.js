const Tags = require("../../model/Tags");

async function list(req, res) {
  const list = await Tags.find({}, "-_id");
  return res.send(list);
}

module.exports = list;
