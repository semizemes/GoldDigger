import { mockDataSender } from "../data.js/mockDataSender.js";
import { sendResponse } from "./sendResponse.js";

let currentData = {
  price: mockDataSender(),
  timeStamp: Date.now(),
};

setInterval(() => {
  currentData = {
    price: mockDataSender(),
    timeStamp: Date.now(),
  };
}, 1000);

export function getData(res) {
    sendResponse(res, 200, "application/json", JSON.stringify(currentData))
}
