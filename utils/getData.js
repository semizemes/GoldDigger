import { mockDataSender } from "../data.js/mockDataSender.js";

let currentData = {
  price: mockDataSender(),
  timeStamp: Date.now(),
};

export function getData() {
  return currentData
}
