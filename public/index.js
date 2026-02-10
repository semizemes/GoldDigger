const priceSource = new EventSource("/api/live")












priceSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log(data);
  
  const livePrice = data.price
  document.getElementById("price-display").innerText = livePrice
  document.getElementById("connection-status").innerText = "Live Price 🟢";
}

priceSource.onerror = () => {
  document.getElementById("connection-status").innerText = "Disconnected 🔴";
}

