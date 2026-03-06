# GoldDigger 💰

A real-time gold investment web application built with **Node.js** and **Server-Sent Events (SSE)**.

## Features

- **Live Gold Price** — Real-time gold price updates streamed to the browser via SSE
- **Buy Gold** — Submit investment orders through a simple form
- **Connection Status** — Visual indicator showing live connection (🟢) or disconnection (🔴)
- **Event-Driven Architecture** — Uses Node.js `EventEmitter` for internal communication

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js (vanilla HTTP server) |
| Frontend | HTML, CSS, vanilla JavaScript |
| Real-time | Server-Sent Events (SSE) |
| Architecture | Event-driven, no frameworks |

## Project Structure

```
GoldDigger/
├── public/
│   └── index.js          # Client-side JS (SSE listener, form handling)
├── handlers/
│   └── routeHandlers.js  # Route handlers (GET, POST, SSE)
├── events/
│   └── livePriceEvents.js # EventEmitter for price updates
├── utils/
│   ├── getData.js         # Utility to fetch gold price data
│   └── sendResponse.js    # Utility to send HTTP responses
├── server.js              # Main server entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

```bash
git clone https://github.com/your-username/GoldDigger.git
cd GoldDigger
npm install
```

### Running the Server

```bash
npm start
```

The server will start and you can access the app at `http://localhost:8000` (or whichever port is configured).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api` | Returns current gold price data |
| `POST` | `/api` | Submit a gold purchase order |
| `GET` | `/api/live` | SSE stream for real-time price updates |

### POST `/api` — Request Body

```json
{
  "time": "2026-03-06T12:00:00.000Z",
  "paidMoney": "500",
  "goldPrice": 1850.75,
  "sold": 0.27
}
```

## How It Works

1. **SSE Connection** — The client opens an `EventSource` connection to `/api/live`, receiving gold price updates every 3 seconds.
2. **Live Price Display** — Each SSE message updates the displayed price and connection status in the browser.
3. **Buy Gold** — The user enters an investment amount and submits the form. The client sends a `POST` request with the current price, timestamp, and calculated gold amount.
4. **Event Emitter** — On the server, the POST handler emits a `price-updated` event for further processing.
