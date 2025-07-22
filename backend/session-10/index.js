// 1- import http module
const http = require("http");

// 2- create server
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "POST" && url === "/data") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log(body);
      const parsed = JSON.parse(body);
      console.log(parsed);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(body);
    });
  } else {
    res.end();
  }
});

// 3- Listen
server.listen(1000, () => {
  console.log("Listen");
});
