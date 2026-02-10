import { mockDataSender } from "../data.js/mockDataSender.js";

export function getData() {
  let currentISOtime = new Date().toISOString()
  return {
  price: mockDataSender(),
  timeStamp: currentISOtime,
}
}
