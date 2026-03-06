const priceSource = new EventSource("/api/live")
const buyForm = document.getElementById("buy-form")
const dialog = document.getElementById("dialog")

let livePrice;
let currentTime;


buyForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const investedMoney = document.getElementById('investment-amount').value
  const goldPrice = livePrice
  const timeStamp = currentTime
  const soldValue = Math.floor((investedMoney / goldPrice) * 100) / 100

  const formData = {
    time: timeStamp,
    paidMoney: investedMoney,
    goldPrice: goldPrice,
    sold: soldValue
  }    

  console.log(`${formData.time}, amount paid: £${formData.paidMoney}, price per Oz: £${formData.goldPrice}, gold sold: ${formData.sold} 0z`)
  
  document.getElementById("investment-summary").innerHTML = `You just bought ${formData.sold} ounces (ozt) for £${formData.paidMoney}. You will receive documentation shortly.`
  dialog.showModal()

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      console.log("Gold has been invested succesfully");
      buyForm.reset()
    } else{
      console.log("Something went wrong, try again");
    }
  } catch (err) {
    console.log("Error with posting! Post msg: ", err);
  }
})

document.getElementById("close-btn").addEventListener("click", () => {
  dialog.close()
})


priceSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  
  livePrice = data.price
  currentTime = data.timeStamp
  document.getElementById("price-display").innerText = livePrice
  document.getElementById("connection-status").innerText = "Live Price 🟢";
}

priceSource.onerror = () => {
  document.getElementById("connection-status").innerText = "Disconnected 🔴";
}

