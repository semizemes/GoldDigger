export function sendResponse(res, sendStatus, contentType, payload){
    res.setHeader("Content-Type", contentType)
    res.statusCode = sendStatus
    res.end(payload)
}