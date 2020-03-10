let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

let road = new Image;
road.src = './assets/png/level-1.png';

//Road Animation
road.onload = () => {
    requestAnimationFrame(gameLoop);
}

let yOffset = -410;

function gameLoop() {

    if (yOffset >= 0) yOffset = -410;

    context.drawImage(road, 0, yOffset);
    context.drawImage(road, 0, yOffset + 410);
    context.drawImage(road, 0, yOffset + 820);
    context.drawImage(player, 130, 205)

    yOffset += 10;

    requestAnimationFrame(gameLoop);
}

//Load Player
let player = new Image;
player.src = './assets/png/car_player.png'