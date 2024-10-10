import Game from "./Game.js";
import Player from "./Player.js";
const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
console.log(game);
let ploc = new Player(0, 0);
let steps = 10;
let collectedFruits = 0;
const gameDiv = document.querySelector('.game-table');
const stepsText = document.querySelector('#game-steps');
const fruitsText = document.querySelector('#game-fruits');
let tryAgainBtn = document.querySelector('#try-again');
tryAgainBtn.addEventListener('click', Restart);
tryAgainBtn.className = 'disabled';
const body = document.querySelector('.body');
stepsText.textContent = steps.toString();
const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());
function Generator(size, player_x, player_y) {
    gameDiv.textContent = '';
    for (let i = 1; i < size + 1; i++) {
        for (let j = 1; j < size + 1; j++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.id = `${i},${j}`;
            div.setAttribute('x', i.toString());
            div.setAttribute('y', j.toString());
            let span = document.createElement('span');
            span.className = 'fruits';
            span.textContent = game.map[i][j].fruits.toString();
            if (game.map[i][j].fruits == 0) {
                span.className = 'field';
                span.textContent = null;
            }
            else {
                span.addEventListener("click", function () { PlayerParam(div.id); }, false);
            }
            if (i == player_x && j == player_y) {
                div.className = 'Player';
                div.textContent = '';
                span.textContent = '';
            }
            div.append(span);
            gameDiv.append(div);
        }
    }
}
function fruitGathering(player_x, player_y) {
    let alreadyGathered = (Array);
    if (alreadyGathered.includes(game.map[player_x][player_y])) {
    }
    alreadyGathered.(game.map[player_x][player_y]);
    collectedFruits += game.map[player_x][player_y].fruits;
    fruitsText.textContent = collectedFruits.toString();
}
function PlayerParam(id) {
    if (firstClick) {
        let loc = id.split(',');
        let x = parseInt(loc[0]);
        let y = parseInt(loc[1]);
        ploc = new Player(x, y);
        Generator(mapSize, x, y);
        fruitGathering(x, y);
        firstClick = false;
    }
}
function Restart() {
    console.log('kk');
}
body.addEventListener('keydown', (e) => {
    let sensibleStep = true;
    if (steps != 0) {
        if (e.key === 'ArrowLeft' && game.map[ploc._position.x][ploc._position.y - 1].fruits != 0) {
            ploc.moveLeft();
        }
        else if (e.key === 'ArrowRight' && game.map[ploc._position.x][ploc._position.y + 1].fruits != 0) {
            ploc.moveRight();
        }
        else if (e.key === 'ArrowUp' && game.map[ploc._position.x - 1][ploc._position.y].fruits != 0) {
            ploc.moveUp();
        }
        else if (e.key === 'ArrowDown' && game.map[ploc._position.x + 1][ploc._position.y].fruits != 0) {
            ploc.moveDown();
        }
        else {
            sensibleStep = false;
        }
        Generator(mapSize, ploc._position.x, ploc._position.y);
        if (sensibleStep) {
            steps--;
            stepsText.textContent = steps.toString();
            fruitGathering(ploc._position.x, ploc._position.y);
        }
    }
    else {
        tryAgainBtn.className = '';
    }
});
Generator(mapSize, 0, 0);
