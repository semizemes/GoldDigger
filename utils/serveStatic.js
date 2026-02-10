import path from "node:path";
import fs from "node:fs/promises";
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(req, res, baseDir) {
  const filePath = path.join(
    baseDir,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(filePath);

  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, getContentType(ext), content);
  } catch (error) {
    if (error.code == "ENOENT") {
      const content = await fs.readFile(path.join(baseDir, "public", "404.html"));
      sendResponse(res, 404, getContentType(ext), content)
    } else{
        sendResponse(res, 500, getContentType(ext), `<html><h1>Server Error: ${err.code}</h1></html>`)
    }
  }
}
