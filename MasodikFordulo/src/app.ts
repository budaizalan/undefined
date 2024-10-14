import Cell, { ProtoCell } from "./Cell.js";
import Game from "./Game.js";
import Player from "./Player.js";

const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
// console.log(game);
let ploc: Player;
let steps = 10;
let numberOfTries = 1;
let numberOfGames = 0;
let collectedFruits = 0;
let onAfterScreen = false;
const records: number[] = [];
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
                span.classList.add('field');
                span.textContent = null;
            } else {
                span.addEventListener("click", function(){PlayerParam(div.id);}, false);
            }
            if(game.map[i][j] instanceof Cell){
                if((game.map[i][j] as Cell).ability != null){
                    span.classList.add('ability');
                }
            }
            if ((game.map[i][j] as Cell).harvested){
                span.textContent = '';
            }
            if (i == player_x && j == player_y) {
                span.classList.add('Player');
                div.textContent = '';
                span.textContent = '';
            }
            div.append(span);
            gameDiv!.append(div);
        }
    }
}

function fruitGathering(player_x: number, player_y: number) {
    if(!(game.map[player_x][player_y] as Cell).harvested){
        collectedFruits += game.map[player_x][player_y].fruits;
    }
    if((game.map[player_x][player_y] as Cell).ability != null){
        game.AddCollectedAbilities((game.map[player_x][player_y] as Cell).ability as string);
        (game.map[player_x][player_y] as Cell).ability = null;
        console.log(game.collectedAbilities);
    }
    // game.map[player_x][player_y].fruits = 0; //   Ezt visszakommentezve kavicsokat húz maga után ahogy lépked (pretty fun ngl)
    (game.map[player_x][player_y] as Cell).harvested = true;
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
    firstClick = true;
    steps = 10;
    AddRecord();
    collectedFruits = 0;
    fruitsText!.textContent = '0';
    stepsText!.textContent = steps.toString();
    numberOfTries++;
    game.map.forEach((row) => {
        row.forEach((cell) => {
            (cell as Cell).harvested = false;
        });
    });
    onAfterScreen = false;
    Generator(mapSize, 0, 0);
}

function NewGame(){
    firstClick = true;
    steps = 10;
    AddRecord();
    collectedFruits = 0;
    numberOfGames++;
    fruitsText!.textContent = '0';
    stepsText!.textContent = steps.toString();
    scoreboardText!.textContent = 'Eredménytábla';
    let bestRecord = document.createElement('div')
    bestRecord.textContent = `Játszott körök: ${numberOfGames}`;
    scoreboardText!.appendChild(bestRecord);
    bestTryText!.textContent = '';
    game = new Game(10);
    onAfterScreen = false;
    Generator(mapSize, 0, 0);
}

function AddRecord(){
    let record = document.createElement('div')
    record.textContent = ` Az ${numberOfTries}. fordulóban elért pontszám: ${collectedFruits}`
    let bestRecord = document.createElement('div')
    records.push(collectedFruits);
    bestTryText!.textContent = '';
    bestRecord.textContent = `Eddigi legjobb eredmény: ${records.reduce((a, b) => Math.max(a, b))}`;
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
        let afterScreenRestartButtonDiv = document.createElement('div');
        let afterScreenNewGameButtonDiv = document.createElement('div');
        let afterScreenRestartButton = document.createElement('button');
        let afterScreenNewGameButton = document.createElement('button');
        afterScreen.className = 'afterscreen';
        afterScreen.textContent = 'A játéknak vége';
        afterScreenText.className = 'afterscreentext';
        afterScreenText.textContent = `Gyüjtött gyümölcsök: ${collectedFruits.toString()}`;
        afterScreenRestartButtonDiv.className = 'aftercreenrestartbuttondiv';
        afterScreenRestartButton.textContent = 'Újrakezdés';
        afterScreenNewGameButtonDiv.className = 'aftercreennewgamebuttondiv';
        afterScreenNewGameButton.textContent = 'Új játék';
        afterScreenRestartButton.className = 'afterscreenrestartbutton';
        afterScreenNewGameButton.className = 'afterscreennewgamebutton';
        afterScreenRestartButton.addEventListener('click', Restart)
        afterScreenNewGameButton.addEventListener('click', NewGame)
        afterScreenRestartButtonDiv.appendChild(afterScreenRestartButton);
        afterScreenNewGameButtonDiv.appendChild(afterScreenNewGameButton);
        afterScreenText.appendChild(afterScreenNewGameButtonDiv);
        afterScreenText.appendChild(afterScreenRestartButtonDiv);
        afterScreen.appendChild(afterScreenText);
        // gameDiv!.textContent = '';
        gameDiv!.appendChild(afterScreen);
        onAfterScreen = true;
    }
}); 


Generator(mapSize, 0, 0);