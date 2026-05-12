const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");;


const FPS = 144;
const radius = 10;
let x = 50;
let x1 = x;
let y = 50;
let y1 = y;
let xSpeed = 1.5;
let ySpeed = 2.5;

let barX = 150;
let barX1 = barX;
let barY = 500;
let barY1 = barY;
let barWidth = 150;
let barHeight = 8;
let barSpeed = 50;


function clear() {
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, canvas.width, canvas.height);

}

function draw() {
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

function update() {
    x += xSpeed;
    y += ySpeed;

    const isCollidingWithRightSide = (x + radius >= canvas.width);
    if (isCollidingWithRightSide) {
        x = canvas.width - radius;
        xSpeed = -xSpeed;
    }

    const isCollidingWithLeftSide = (x - radius <= 0);
    if (isCollidingWithLeftSide) {
        x = 0 + radius;
        xSpeed = -xSpeed;
    }

    const isCollidingWithBottomSide = (y + radius >= canvas.height);
    if (isCollidingWithBottomSide) {
        alert("Game Over!");
        reset();
    }

    const isCollidingWithTopSide = (y - radius <= 0);
    if (isCollidingWithTopSide) {
        y = 0 + radius;
        ySpeed = -ySpeed;
    }
}


function drawBar() {
    context.fillStyle = "white";
    context.fillRect(barX, barY, barWidth, barHeight);
}

function isEnded() {
    if (y + radius >= canvas.height) {
        return true;
    }
    return false;
}

function reset() {
    x = x1;
    y = y1;
    xSpeed = 1;
    ySpeed = 2;
    barX = barX1;
    barY = barY1;
}

function checkEnd() {
    if (isEnded()) {
        reset();
    }
}

function moveBarLeft() {
    if (barX <= 0) {
        barX = 0;
    } else {
        barX -= barSpeed;
    }
}

function moveBarRight() {
    if (barX + barWidth >= canvas.width) {
        barX = canvas.width - barWidth;
    } else {
        barX += barSpeed;
    }
}

function checkCollisionWithBar() {
    if (y + radius >= barY && y - radius <= barY + barHeight && x + radius >= barX && x - radius <= barX + barWidth) {
        y = barY - radius;
        ySpeed = -ySpeed;
    }
}


function animate() {
    clear();
    draw();
    update();
    drawBar();
    checkCollisionWithBar();
    checkEnd();
}

window.addEventListener("keydown", function (e) {
    const keyCode = e.key;
    if (keyCode == "ArrowLeft") {
        moveBarLeft();
    } else if (keyCode == "ArrowRight") {
        moveBarRight();
    }
});

window.setInterval(animate, 1000 / FPS);




