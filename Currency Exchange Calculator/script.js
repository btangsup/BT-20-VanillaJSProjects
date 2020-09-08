const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');

const swap = document.getElementById('swap');

// fetch exchange rate api and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    const url = 'https://api.exchangerate-api.com/v4/latest/'

    fetch(`${url}${currency_one}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const rate = data.rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

// event listeners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();

// updating to a server = put request
// recieve data from a server = get request 
// post request requires file along with options, using a POST method
// GET request doesnt require any parmeters, it will return a promise