const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add an item and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: parseInt(amount.value.trim()),
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';

        console.log(transaction);
    }
}

// generate random id //

function generateID() {
    return Math.floor(Math.random() * 10000);
}

// add transactions to DOM list

function addTransactionDOM(transaction) {
    // figure out which is positive and negative

    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // add class based on value

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item);
}

//upate the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc +=item), 0).toFixed(2);

    console.log(amounts);
    console.log(total);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc+=item), 0)
        .toFixed(2);

    const expense = (amounts
    .filter(item=> item < 0)
    .reduce((acc,item) => (acc += item), 0)
    * -1).toFixed(2);
    
    balance.innerText = `${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// update local storage transactions 

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// EVENT LISTENERS //

form.addEventListener('submit', addTransaction);