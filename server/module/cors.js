const acceptList = [
  "https://localhost:3000",
  "https://localhost:9876",
  "https://mad-street-shop.kimhaein.now.sh",
  "https://mad-street-shop.now.sh",
];

// {|| !req.headers.origin} 부분은 포스트맨으로 테스트하기 위함.
module.exports.corsOptions = function (req, callback) {
  if (acceptList.indexOf(req.headers.origin) !== -1 || !req.headers.origin) {
    callback(null, { origin: true });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};
