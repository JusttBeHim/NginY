const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url,
  );

  const extname = String(path.extname(filepath).toLowerCase());

  const minetype = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };

  const contentType = minetype[extname] || "application/octet-stream";

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        res.writeHead(404, { contentType: "text/html" });
        res.end("404: file not found brooo");
      }
    } else {
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`server is listeing on ${port}`);
});
