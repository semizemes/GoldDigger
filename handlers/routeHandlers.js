import { livePrieEvents } from "../events/livePriceEvents.js";
import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGet(res) {
  const data = getData();
  livePrieEvents.emit("price-updated", data);
  sendResponse(res, 200, "application/json", JSON.stringify(data));
}

export async function handlePost(req, res) {
    try {
        
    } catch (err) {
        console.log(err);
    }
}

export async function handleLivePrice(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const timer = setInterval(() => {
    const data = getData();
    res.write(`data: ${JSON.stringify(data)} \n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(timer);
    console.log("request yo'q, SSE listener o'chirildi");
  });
}
