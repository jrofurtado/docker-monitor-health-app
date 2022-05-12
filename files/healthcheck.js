var http = require("http");

var options = {
  host: "localhost",
  port: "80",
  path: "/",
  timeout: 2000,
};

var request = http.request(options, (res) => {
  if (res.statusCode != 200) {
    process.exit(1);
  }
  process.exit(0);
});

request.on("error", function (err) {
  process.exit(1);
});

request.end();
