let base_url = "https://latest.currency-api.pages.dev/v1/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector('form button');
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;

        if(select.name === "from" && currcode === "USD")
            newOption.selected = "selected";
        else if(select.name === "to" && currcode === "INR")
            newOption.selected = "selected";

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

window.addEventListener("load", () =>{
    updateExchangeRate();
})

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 0)
    {
        amtVal = 1;
        amount.valueS = 1;
    }

    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalRate = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
}