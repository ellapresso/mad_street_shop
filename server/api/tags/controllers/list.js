const Tags = require("../model/Tags");

async function list(req, res) {
  const data = await Tags.find();
  const result = data.map(e => {
    return { icon: e.icon, tags: e.tags };
  });
  return res.send(result);
}

module.exports = list;
