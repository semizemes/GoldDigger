fetch("/api")
  .then((res) => {
  if (!res.ok) {
    document.getElementById("connection-status").innerText = "Disconnected 🔴";
    document.getElementById("invest-btn").disabled = true
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  document.getElementById("connection-status").innerText = "Live Price 🟢";
  document.getElementById("invest-btn").disabled = false
  return res.json();
})
.then(data => {
  console.log(data)
})