const acceptList = [
  "localhost:3000",
  "localhost:9876",
  "mad-street-shop.kimhaein.now.sh",
  "mad-street-shop.now.sh",
];

module.exports.corsOptions = function (req, callback) {
  if (acceptList.indexOf(req.headers.host) !== -1) {
    callback(null, { origin: true });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};
