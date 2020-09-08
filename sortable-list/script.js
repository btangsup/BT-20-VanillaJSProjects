const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// store list items 

const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        listItems.push(listItem);

        draggable_list.appendChild(listItem);

        addEventListeners();
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = doucument.querySelectorAll('draggable-list li');

    draggables.forEach((draggables) => {
        draggables.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(() => {
        dragListItems.addEventListener('dragover', dragOver)
    })
}