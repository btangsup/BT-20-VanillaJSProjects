const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch api and get random user and add money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    console.log(newUser)

    addData(newUser);
}

//doubles everyones money 

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })

    updateDOM();
}

// sort by RICHESTTTT PERSON (SORT)

function sortRichest() {
    data.sort((a,b) => {
        return b.money - a.money;
    })

    updateDOM();
}

// SHOW THE MILLIONAIRES (FILTER)

function showMillionares() {
    data = data.filter(function(user) {
        return user.money > 1000000;
    })

    updateDOM();
}

// calculate TOTAL WEALTH (REDUCE)

function calculateTotal() {
    const wealth = data.reduce((acc, user) => {
        return acc += user.money;
    }, 0)

    console.log(wealth);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth ${wealth}</h3>`;
    main.appendChild(wealthEl);
}


function addData(userObj) {
    data.push(userObj);

    updateDOM();
}

// updateDOM

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(function (person) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong>${formatMoney(person.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number) {

    // regex to format money 
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionairesBtn.addEventListener('click', showMillionares);
calculateWealthBtn.addEventListener('click', calculateTotal)
