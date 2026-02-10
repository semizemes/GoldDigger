import { mockDataSender } from "../data.js/mockDataSender.js";

export function getData() {
  return {
  price: mockDataSender(),
  timeStamp: Date.now(),
}
}
