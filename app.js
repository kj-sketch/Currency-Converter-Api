// This url will give you currencies usd/XXX
const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for(currCode in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
      }
      select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode].country;
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     img = element.parentElement.querySelector("img");
     img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === ""|| amtVal < 1){
        amtVal = 1;
         amount.value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    try {
        // Fetch data and get to price rate
   let response = await fetch(url);
//    response.ok = status code in 200-299 !
   if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
   }
//    .then(response => response.json())
//    .then(data => data['usd'].inr)
   let data = await response.json();
   console.log(data);
   let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   //kj Calculate the convert amount
   let finalAmount = amtVal*rate;
   let CoversionValue = finalAmount.toFixed(2);
   //kj Get the currency symbols
   const fromSymbol = countryList[fromCurr.value].symbol;
   const toSymbol = countryList[toCurr.value].symbol;
   
   //kj Display the result with symbols

   msg.innerText = `${amtVal} ${fromSymbol} = ${CoversionValue} ${toSymbol}`
   } catch (error) {
       console.error('Error fetching the exchange rate', error);
       // Handle the error appropriately
       return null;
   }
}










// // async function getUsdInrRate() {
//     try {
//          // Fetch data and get INR rate
//     const usd = await fetch(url)
//     // response.ok = status code in 200-299 !
//     if (!usd.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // .then(response => response.json())
//     // .then(data => data['usd'].inr)
//     const data = await usd.json();
//     return data.usd.inr;

//     } catch (error) {
//         console.error('Error fetching the exchange rate', error);
//         // Handle the error appropriately
//         return null;
//     }
// }

// getUsdInrRate();

