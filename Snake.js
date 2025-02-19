let ya7lw = new Audio("./resources/ye7lw.mp3");
let yabaye = new Audio("./resources/yabaye.mp3");
let dir = {
    ArrowUp: 0,
    ArrowDown: 1,
    ArrowRight: 2,
    ArrowLeft: 3,
};
let opposite = [1, 0, 3, 2];
class Point {
    constructor(x, y) {
        (this.x = x), (this.y = y);
    }
    equals(PtherPoint) {
        return this.x === PtherPoint.x && this.y === PtherPoint.y;
    }
}

let food = new Point(25, 25);

let snake = {
    direction: 2,
    head: new Point(0, 0),
    body: [new Point(0, 0)],
};
function checkCollision() {
    for (let segment of snake.body) {
        if (snake.head.equals(segment)) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    debugger;
    let p;
    do {
        p = new Point(
            parseInt(Math.random() * 49),
            parseInt(Math.random() * 49)
        );
    } while (snake.body.some((segment) => segment.equals(p)));
    return p;
}

function DrowCell(x, y, color, type = "") {
    let cell = document.createElement("div");
    cell.classList = `cell ${type}`;
    cell.style.backgroundColor = color;
    cell.style.top = `${x * 16}px`;
    cell.style.left = `${y * 16}px`;
    document.querySelector(".container").appendChild(cell);
}

function DrowSnake(KeepTail) {
    document.querySelector(".container").innerHTML = "";
    DrowCell(food.x, food.y, "#9D3EE6", "food");
    for (cell of snake.body)
        DrowCell(
            cell.x,
            cell.y,
            cell.equals(snake.head) ? "#496AB3" : "#313C54"
        );
    if (!KeepTail) {
        snake.body.shift();
    }
}

function MoveSnake() {
    let headx = snake.head.x,
        heady = snake.head.y;
    if (snake.direction == 0) headx--;
    else if (snake.direction == 1) headx++;
    else if (snake.direction == 2) heady++;
    else heady--;
    headx = (headx + 50) % 50;
    heady = (heady + 50) % 50;
    snake.head = new Point(headx, heady);
    if (checkCollision(snake.head)) {
        yabaye.play();
        confirm(`game over with score ${snake.body.length}`);
        snake.body = [new Point(0, 0)];
        snake.direction = 2;
        snake.head = new Point(0, 0);
        food = new Point(25, 25);
        MoveSnake();
    }
    snake.body.push(snake.head);
    if (snake.head.x == food.x && snake.head.y == food.y) {
        ya7lw.play();
        document.querySelector(".food").remove();
        food = generateFood();
        DrowSnake(true);
    } else DrowSnake(false);
}
function changeDirwction(key) {
    if (
        key.substr(0, 5) != "Arrow" ||
        dir[key] == snake.direction ||
        dir[key] == opposite[snake.direction]
    )
        return;
    snake.direction = dir[key];
    MoveSnake();
}

document.addEventListener("keydown", function (event) {
    changeDirwction(event.key);
});

setInterval(MoveSnake, 50);
