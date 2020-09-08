const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// create ball props

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// create paddle props

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 20,
    dx: 0,
}

// create bricks props

const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// create bricks
const bricks = [];

for(let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY

        bricks[i][j] = {x, y, ...brickInfo}
    }
}

console.log(bricks);

// draw paddle on canvas

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// draw ball on canvas
function drawBall () {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI *2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// draw bricks on canvas

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.width, brick.height);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

//draw score on canvas

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}



// move paddle on canvas 

function movePaddle() {
    paddle.x += paddle.dx;

    // wall detection
    if(paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //wall collision (right and left walls) 
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; //balls.dx = balls.dx * -1
    }

    // wall collision ( top and bottom walls)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1; //balls.dx = balls.dx * -1
    }

    // paddle collision
    if (ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.width && 
        ball.y + ball.size > paddle.y
        ) {
            ball.dy =  -ball.speed;
        }

    
    // brick collision

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.width &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.height
                    ) {
                        ball.dy *= -1;
                        brick.visible = false;

                        increaseScore();
                    }
            }
        })
    });

    // hit bottom wall - lose 
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

function increaseScore() {
    score ++;

    if (score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    })
}



// draw everything
function draw() {
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update() {
    movePaddle();
    moveBall();
    // draw everything
    draw();

    requestAnimationFrame(update);
}

update();

function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key ==='ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if(e.key ==='Right' || e.key ==='ArrowRight' || e.key ==='Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}

// keyboard event handlers

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



// rules and btn event listener

rulesBtn.addEventListener('click', () => rules.classList.add('show'));

closeBtn.addEventListener('click', () => rules.classList.remove('show'));