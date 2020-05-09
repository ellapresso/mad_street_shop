const acceptList = [
  "https://localhost:3000",
  "https://localhost:9876",
  "https://mad-street-shop.kimhaein.now.sh",
  "https://mad-street-shop.now.sh",
];

module.exports.corsOptions = function (req, callback) {
  console.log("cors >> ", req.headers);
  if (acceptList.indexOf(req.headers.origin) !== -1) {
    callback(null, { origin: true });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};
