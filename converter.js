//first part of the api to fetch current rate
let currencyAPI =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let selectDropdown = document.querySelectorAll("select");
let button = document.querySelector("button");
let currencyFrom = document.querySelector(".from");
let currencyTo = document.querySelector(".to");
let swapArrow = document.querySelector("i");
let countryFrom, countryTo;

for (let select of selectDropdown) {
  let option, currency;
  for (currency in countryList) {
    option = document.createElement("option");
    option.innerText = currency;
    option.value = currency;

    if (select.name == "from" && currency == "USD") {
      option.selected = true;
    } else if (select.name == "to" && currency == "BDT") {
      option.selected = true;
    }
    select.append(option);
  }

  select.addEventListener("change", () => {
    let img = select.parentElement.querySelector("img");
    let selectedIdx = select.selectedIndex;
    let selectedOption = select.options[selectedIdx];
    updateFlag(img, selectedOption.value);
  });
}

const updateFlag = (img, currency) => {
  console.log(currency);
  let country = countryList[currency];
  let src = `https://flagsapi.com/${country}/flat/64.png`;
  img.src = src;
};

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

swapArrow.addEventListener("click", () => {
  updateFlag(img, selectedOption.value);
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let inputAmount = document.querySelector(".amount");
  let amount = inputAmount.value;
  if (amount == "" || amount < 1) {
    (amount = 1), (inputAmount.value = "1");
  }
  let URL = `${currencyAPI}/${currencyFrom.value.toLowerCase()}/${currencyTo.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let value = data[currencyTo.value.toLowerCase()];
  value *= amount;

  let result = document.querySelector(".result");
  result.innerText = `${amount} ${currencyFrom.value} = ${value.toFixed(2)} ${
    currencyTo.value
  }`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});
