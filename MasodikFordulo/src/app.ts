import Game from "./Game.js";
import Player from "./Player.js";

const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
// console.log(game);
let harvested: String[] = [];
let ploc = new Player(0,0);
let steps = 10;
let numberOfTries = 1;
let collectedFruits = 0;
let onAfterScreen = false;
const records: Number[] = [];
const stepsText = document.querySelector('#game-steps');
const fruitsText = document.querySelector('#game-fruits');
const bestTryText = document.querySelector('#besttry');
const gameDiv = document.querySelector('.game-table');
const scoreboardText = document.querySelector('.game-scoreboard');
const body = document.querySelector('.body');
stepsText!.textContent = steps.toString();
const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());

function Generator(size: number, player_x: number, player_y: number) {
    gameDiv!.textContent = '';
    for (let i = 1; i < size+1; i++) {
        for (let j = 1; j < size+1; j++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.id = `${i},${j}`;
            div.setAttribute('x', i.toString());
            div.setAttribute('y', j.toString());
            let span = document.createElement('span');
            span.className = 'fruits';
            span.textContent = game.map[i][j].fruits.toString();
            if (game.map[i][j].fruits == 0) {
                span.className = 'field'
                span.textContent = null;
            } else {
                span.addEventListener("click", function(){PlayerParam(div.id);}, false);
            }
            if (harvested.includes(`${game.map[i][j].position.x},${game.map[i][j].position.y}`)){
                span.textContent = '';
            }
            if (i == player_x && j == player_y) {
                div.className = 'Player';
                div.textContent = '';
                span.textContent = '';
            }
            div.append(span);
            gameDiv!.append(div);
        }
    }
}

function fruitGathering(player_x: number, player_y: number) {
    let currentLine = `${game.map[player_x][player_y].position.x},${game.map[player_x][player_y].position.y}`
    if (!harvested.includes(currentLine)) {
        harvested.push(currentLine)
        collectedFruits += game.map[player_x][player_y].fruits;
    }
    // game.map[player_x][player_y].fruits = 0; //   Ezt visszakommentezve kavicsokat húz maga után ahogy lépked (pretty fun ngl)
    fruitsText!.textContent = collectedFruits.toString();
}

function PlayerParam(id: string){
    if (firstClick) {
        let loc = id.split(',');
        let x = parseInt(loc[0]);
        let y = parseInt(loc[1]);
        ploc = new Player(x,y);
        Generator(mapSize, x,y);
        fruitGathering(x, y)
        firstClick = false;
    }
}


function Restart(){
    console.log('oki');
    firstClick = true;
    steps = 10;
    AddRecord();
    collectedFruits = 0;
    fruitsText!.textContent = '0';
    stepsText!.textContent = steps.toString();
    numberOfTries++;
    onAfterScreen = false;
    harvested = [];
    Generator(mapSize, 0, 0);
}

function AddRecord(){
    let record = document.createElement('div')
    record.textContent = ` Az ${numberOfTries}. fordulóban elért pontszám: ${collectedFruits}`
    let bestRecord = document.createElement('div')
    records.push(collectedFruits);
    bestTryText!.textContent = '';
    bestRecord.textContent = `Eddigi legjobb eredmény: ${records.reduce((a, b) => Math.max(a, b))}`; //nem tudom miért ír errort, faszán müködik
    bestTryText!.appendChild(bestRecord);
    scoreboardText!.appendChild(record);
}

body!.addEventListener('keydown', (e) => {
    let sensibleStep = true;
    if (steps != 0) {
        if ((e as KeyboardEvent).key === 'ArrowLeft' && game.map[ploc._position.x][ploc._position.y-1].fruits != 0 ) {
            ploc.moveLeft();
        } else if ((e as KeyboardEvent).key === 'ArrowRight' && game.map[ploc._position.x][ploc._position.y+1].fruits != 0 ) {
            ploc.moveRight();
        } else if ((e as KeyboardEvent).key === 'ArrowUp' && game.map[ploc._position.x-1][ploc._position.y].fruits != 0 ) {
            ploc.moveUp();
        } else if ((e as KeyboardEvent).key === 'ArrowDown' && game.map[ploc._position.x+1][ploc._position.y].fruits != 0 ) {
            ploc.moveDown();
        } else {
            sensibleStep = false;
        }
        Generator(mapSize, ploc._position.x, ploc._position.y)
        if (sensibleStep) {
            steps--;
            stepsText!.textContent = steps.toString();
            fruitGathering(ploc._position.x, ploc._position.y)
        }
    } else if (!onAfterScreen){
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
        afterScreenButton.addEventListener('click', Restart)
        afterScreenButtonDiv.appendChild(afterScreenButton);
        afterScreenText.appendChild(afterScreenButtonDiv);
        afterScreen.appendChild(afterScreenText);
        // gameDiv!.textContent = '';
        gameDiv!.appendChild(afterScreen);
        onAfterScreen = true;
    }
}); 


Generator(mapSize, 0, 0);