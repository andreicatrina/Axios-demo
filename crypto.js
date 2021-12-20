async function getCoingeckoPrice(currency) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=${currency}&include_market_cap=true&include_24hr_change=true`
  );
  console.log(response.data);
  const keys = Object.keys(response.data);
  const rows = document.getElementById("token-rows");
  rows.innerHTML = "";
  for (const key of keys) {
    console.log(`Am ajuns la cheia ${key}`);

    const rows = document.getElementById("token-rows");
    const hChange = response.data[key][`${currency}_24h_change`];
    console.log(currency);
    let className = getClassNameForHChange(hChange);
    let row = getNewRow(keys, key, response, currency, className, hChange);
    rows.innerHTML = rows.innerHTML + row;
  }
}

getCoingeckoPrice("usd");

function currencyClick(currency) {
  getCoingeckoPrice(currency);
}

function getClassNameForHChange(hChange) {
  if (hChange < 0) {
    return "red";
  } else {
    return "green";
  }
}

function getNewRow(list, key, response, currency, className, hChange) {
  return `<tr>\
    <td>${list.indexOf(key) + 1}</td>\
    <td>${key}</td>\
    <td>${response.data[key][currency]}</td>\
    <td>${response.data[key][`${currency}_market_cap`]}</td>\
    <td class= ${className}>${hChange.toFixed(2)}</td>\
    </tr>`;
}
