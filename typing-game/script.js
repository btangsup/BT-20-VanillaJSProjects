const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = ["react", "vue", "syntax", "javascript", "typescript", "css", "SASS", "promises", "callback", "design", "front-end", "function", "conditionals", "back-end", "src", "jquery", "api", "json", "juno", "bootcamp", "projects", "vs-code", "wordpress", "website", "apps", "agile", "gong", "1", "north-pole", "south-pole", "scope", "curry", "tags", "cohort", "25", "konami", "portfolio", "salad-club", "show and tell", "deadlines", "laptop", "squirtle-squad", "marley", "instructor", "career", "console", "libraries", "frameworks", "memes", "hacker", "debug", "float", "flex", "forms", "grids", "github", "objects", "arrays", "boolean", "variables", "props", "bubbling", "events", "map", "filter", "snippets", "atom", "classroom", "tech-test", "interview", "undefined", "null", "DOM", "Beagel", "Bagel", "RegEx", "responsive", "accessbility", "navigation", "hamburger", "layout", "global", "block", "onClick", "components", "class", "firebase", "experience", "memory", "npm", "node", "tabs", "spaces", "footer", "header", "html", "xml", "colour", "modular", "fizzbuzz", "zoom", "toronto", "queen st", "hello world", "const", "let", "var", "absolute", "sticky", "relative", "transform", "margin", "padding", "mentors", "fishbowl", "pokemon API", "dreamhost", "props", "pair-programming", "mob-programming", "skills", "chocolate eggs", "es6", "arrow", "fundamentals", "logic", "circle of chairs", "pajamas", "salad", "calzone", "soup", "sandwich", "animal-crossing", "coffee", "bubble-tea", "sushi", "bar", "this", "data", "php", "mindblown", "secure", "sublime", "plugins", "dog", "border", "gradients", ];

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value to DOM 
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//focus on input text field on start //
text.focus();

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// start counter time down

const timeInterval = setInterval(updateTime, 1000);

//function update time

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

// add word to DOM
function addWordtoDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

addWordtoDOM();

// update score

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// game over!!!

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick ="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';

}

// evnet listeners

text.addEventListener('input', (e) => {
    const insertedText = e.target.value;
    console.log(insertedText)

    if(insertedText === randomWord) {
        addWordtoDOM();
        updateScore();
        // clear
        e.target.value = '';

        if(difficulty === 'hard') {
            time +=2;
        } else if( difficulty = 'medium') {
            time +=3;
        } else {
            time += 5;
        }
        updateTime();
})

// settings change

settingsBtn.addEventListener('click', () => 
    settings.classList.toggle('hide'));

// settings select

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty')
})
