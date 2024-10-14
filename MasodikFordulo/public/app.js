import Cell from "./Cell.js";
import Game from "./Game.js";
import Player from "./Player.js";
const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
// console.log(game);
let ploc;
let steps = 10;
let numberOfTries = 1;
let collectedFruits = 0;
let onAfterScreen = false;
const records = [];
const stepsText = document.querySelector('#game-steps');
const fruitsText = document.querySelector('#game-fruits');
const bestTryText = document.querySelector('#besttry');
const gameDiv = document.querySelector('.game-table');
const scoreboardText = document.querySelector('.game-scoreboard');
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
                span.classList.add('field');
                span.textContent = null;
            }
            else {
                span.addEventListener("click", function () { PlayerParam(div.id); }, false);
            }
            if (game.map[i][j] instanceof Cell) {
                if (game.map[i][j].ability != null) {
                    span.classList.add('ability');
                }
            }
            if (game.map[i][j].harvested) {
                span.textContent = '';
            }
            if (i == player_x && j == player_y) {
                span.classList.add('Player');
                div.textContent = '';
                span.textContent = '';
            }
            div.append(span);
            gameDiv.append(div);
        }
    }
}
function fruitGathering(player_x, player_y) {
    if (!game.map[player_x][player_y].harvested) {
        collectedFruits += game.map[player_x][player_y].fruits;
    }
    if (game.map[player_x][player_y].ability != null) {
        game.AddCollectedAbilities(game.map[player_x][player_y].ability);
        game.map[player_x][player_y].ability = null;
        console.log(game.collectedAbilities);
    }
    // game.map[player_x][player_y].fruits = 0; //   Ezt visszakommentezve kavicsokat húz maga után ahogy lépked (pretty fun ngl)
    game.map[player_x][player_y].harvested = true;
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
    firstClick = true;
    steps = 10;
    AddRecord();
    collectedFruits = 0;
    fruitsText.textContent = '0';
    stepsText.textContent = steps.toString();
    numberOfTries++;
    game.map.forEach((row) => {
        row.forEach((cell) => {
            cell.harvested = false;
        });
    });
    onAfterScreen = false;
    Generator(mapSize, 0, 0);
}
function AddRecord() {
    let record = document.createElement('div');
    record.textContent = ` Az ${numberOfTries}. fordulóban elért pontszám: ${collectedFruits}`;
    let bestRecord = document.createElement('div');
    records.push(collectedFruits);
    bestTryText.textContent = '';
    bestRecord.textContent = `Eddigi legjobb eredmény: ${records.reduce((a, b) => Math.max(a, b))}`;
    bestTryText.appendChild(bestRecord);
    scoreboardText.appendChild(record);
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
    else if (!onAfterScreen) {
        let afterScreen = document.createElement('div');
        let afterScreenText = document.createElement('div');
        let afterScreenButtonDiv = document.createElement('div');
        let afterScreenButton = document.createElement('button');
        afterScreen.className = 'afterscreen';
        afterScreen.textContent = 'A játéknak vége';
        afterScreenText.className = 'afterscreentext';
        afterScreenText.textContent = `Gyüjtött gyümölcsök: ${collectedFruits.toString()}`;
        afterScreenButtonDiv.className = 'afterscreenbuttondiv';
        afterScreenButton.textContent = 'Újrakezdés';
        afterScreenButton.className = 'afterscreenbutton';
        afterScreenButton.addEventListener('click', Restart);
        afterScreenButtonDiv.appendChild(afterScreenButton);
        afterScreenText.appendChild(afterScreenButtonDiv);
        afterScreen.appendChild(afterScreenText);
        // gameDiv!.textContent = '';
        gameDiv.appendChild(afterScreen);
        onAfterScreen = true;
    }
});
Generator(mapSize, 0, 0);
