import {EventEmitter} from "node:events"
import { createAlert } from "../utils/createAlert.js"

export const livePrieEvents = new EventEmitter()
livePrieEvents.on("price-updated", createAlert)