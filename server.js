import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { getData } from "./utils/getData.js";

const PORT = process.env.PORT || 8000;

const __dirname = import.meta.dirname;

const data = getData();
console.log(data);

const server = http.createServer(async (req, res) => {
  if (req.url == "/api") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const timer = setInterval(() => {
      res.write(`data: ${JSON.stringify(data)} \n\n`);
    }, 1000);

    req.on("close", () => {
      clearInterval(timer);
      console.log("request yo'q, SSE listener o'chirildi");
    });
  } else if (!req.url.startsWith("/api")) {
    return await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
