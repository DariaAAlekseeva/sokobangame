"use strict";
var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sizeLab = {
    size: 0,
    dX: 0,
    dY: 0
}

window.addEventListener("resize", resizeCanvas);



var imgWall = new Image();
imgWall.src = "/pic/wall.jpg";
var imgBox = new Image();
imgBox.src = "/pic/box.jpg"
var imgMan = new Image();
imgMan.src = "/pic/man.jpg";
var imgTarget = new Image();
imgTarget.src = "/pic/target.jpg"
const history = [];
let map = [];
let steps = 0;
var currentLevel = 0;
const currentXY = { row: 0, col: 0 };

function resizeCanvas() {

    const { width, height, y } = ctx.canvas.getBoundingClientRect();
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.canvas.y = y;
    if (width >= height) {
        sizeLab.size = ctx.canvas.height / map.length;
    }
    if (width < height) {
        sizeLab.size = ctx.canvas.width / map[0].length;
    }

    sizeLab.dX = (ctx.canvas.width - sizeLab.size * map[0].length) / 2;
    sizeLab.dY = (ctx.canvas.height - sizeLab.size * map.length) / 2;
    drawMap();

}

window.addEventListener('keydown', buttonDown);
document.addEventListener('click', mouseClick);
document.addEventListener('touchend', mouseClick);




function buttonDown(e) {

    if (e.code === "KeyW" || e.code === "ArrowUp") {
        check(currentXY.row - 1, currentXY.col, currentXY.row - 2, currentXY.col);
    }
    if (e.code === "KeyS" || e.code === "ArrowDown") {
        check(currentXY.row + 1, currentXY.col, currentXY.row + 2, currentXY.col);
    }
    if (e.code === "KeyA" || e.code === "ArrowLeft") {
        check(currentXY.row, currentXY.col - 1, currentXY.row, currentXY.col - 2);
    }
    if (e.code === "KeyD" || e.code === "ArrowRight") {
        check(currentXY.row, currentXY.col + 1, currentXY.row, currentXY.col + 2);
    }

    if (e.code === "Escape") {
        if (history.length > 0) {
            map = JSON.parse(history.pop());
            steps++;
        }
        document.getElementById("spanSteps").innerHTML = steps;
        drawMap();

    }
};

function mouseClick(e) {
    const xClick = e.clientX;
    const yClick = e.clientY - ctx.canvas.y;
    const manX = sizeLab.dX + currentXY.col * sizeLab.size;
    const manY = sizeLab.dY + currentXY.row * sizeLab.size;
   

    if (xClick > manX && xClick < manX + sizeLab.size && yClick < manY && yClick > manY-sizeLab.size) {
        check(currentXY.row - 1, currentXY.col, currentXY.row - 2, currentXY.col);
    }
    if (xClick > manX && xClick < manX + sizeLab.size && yClick < manY+2*sizeLab.size && yClick > manY+sizeLab.size) {
        check(currentXY.row + 1, currentXY.col, currentXY.row + 2, currentXY.col);
    }
    if (xClick > manX-sizeLab.size && xClick < manX && yClick < manY+sizeLab.size && yClick > manY) {
        check(currentXY.row, currentXY.col - 1, currentXY.row, currentXY.col - 2);
    }
    if (xClick > manX+sizeLab.size && xClick < manX + 2*sizeLab.size &&  yClick < manY+sizeLab.size && yClick > manY) {
        check(currentXY.row, currentXY.col + 1, currentXY.row, currentXY.col + 2);
    }

}



function check(x1, y1, x2, y2) {
    if (map[x1][y1] === 1)
        return;
    history.push(JSON.stringify(map))

    if ((map[x1][y1] & 2) === 2) {
        if ((map[x2][y2] & 3) > 0) {
            history.pop();
            return;
        }
        map[x2][y2] |= 2;
        map[x1][y1] ^= 2;
    }
    map[currentXY.row][currentXY.col] ^= 8;
    map[x1][y1] |= 8;
    steps++;
    document.getElementById("spanSteps").innerHTML = steps;
    drawMap();
}


function drawMap() {

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();

    let box = 0;
    let boxFixed = 0;


    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {

            if (map[y][x] & 1) {
                ctx.drawImage(imgWall, sizeLab.dX + x * sizeLab.size, sizeLab.dY + y * sizeLab.size, sizeLab.size, sizeLab.size);

            }

            if (map[y][x] & 4) {
                if (map[y][x] & 2) {
                    boxFixed++;
                };
                ctx.drawImage(imgTarget, sizeLab.dX + x * sizeLab.size, sizeLab.dY + y * sizeLab.size, sizeLab.size, sizeLab.size);

            }


            if (map[y][x] & 8) {
                currentXY.row = y;
                currentXY.col = x;
                ctx.drawImage(imgMan, sizeLab.dX + x * sizeLab.size, sizeLab.dY + y * sizeLab.size, sizeLab.size, sizeLab.size);

            }

            if (map[y][x] & 2) {
                box++;
                ctx.drawImage(imgBox, sizeLab.dX + x * sizeLab.size, sizeLab.dY + y * sizeLab.size, sizeLab.size, sizeLab.size);

            }

        }
    }
    document.getElementById("spanBox").innerHTML = boxFixed + "/" + box;

    if (boxFixed === box) {
        win();
    }
}

function onloadImages(callback) {
    let imagesArr = [
        "/pic/box.jpg",
        "/pic/wall.jpg",
        "/pic/target.jpg",
        "/pic/man.jpg"
    ];
    let imagesLoaded = 0;

    imagesArr.forEach(function (image) {
        let img = new Image();
        img.onload = function () {
            imagesLoaded++;
            call();
        };

        img.onerror = function () {
            imagesLoaded++;
            alert('при загрузке игры произошла ошибка, пожалуйста, обновите страницу!')
        }
        img.src = image;
    });

    function call() {
        if (imagesLoaded === imagesArr.length) {
            callback();
        }
    }
}

function startGame() {
    steps = 0;
    document.getElementById("spanSteps").innerHTML = steps;
    let lab = sessionStorage.getItem('currentLevel');

    document.getElementById("spanLevel").innerHTML = lab * 1 + 1;
    map = JSON.parse(JSON.stringify(totalMap[lab]));
    resizeCanvas();

}

function refreshGame() {
    map = JSON.parse(history[0]);
    history.length = 0;
    startGame();
}

