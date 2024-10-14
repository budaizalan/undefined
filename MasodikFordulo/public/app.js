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
let IsAbilityActivated = false;
let activatedAbility = '';
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
            div.id = `${j},${i}`;
            div.setAttribute('x', j.toString());
            div.setAttribute('y', i.toString());
            let span = document.createElement('span');
            span.className = 'fruits';
            span.textContent = game.map[i][j].fruits.toString();
            if (game.map[i][j].fruits == 0) {
                span.classList.add('field');
                span.textContent = null;
            }
            else {
                span.addEventListener("click", () => {
                    if (firstClick) {
                        PlayerParam(div.id);
                    }
                    else {
                        if (IsAbilityActivated && activatedAbility == 'teleport') {
                            teleportPlayer(parseInt(div.getAttribute('x')), parseInt(div.getAttribute('y')));
                        }
                    }
                }, false);
            }
            if (game.map[i][j] instanceof Cell) {
                if (game.map[i][j].ability != null) {
                    span.classList.add('ability');
                }
            }
            if (game.map[i][j].harvested) {
                span.textContent = '';
            }
            if (i == player_y && j == player_x) {
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
    if (!game.map[player_y][player_x].harvested) {
        collectedFruits += game.map[player_y][player_x].fruits;
    }
    if (game.map[player_y][player_x].ability != null) {
        let ability = game.map[player_y][player_x].ability;
        game.AddCollectedAbilities(ability);
        let abilityCount = document.querySelector(`#${ability}`);
        if (abilityCount != null) {
            abilityCount.textContent = game.collectedAbilities[ability].toString();
        }
        game.map[player_y][player_x].ability = null;
    }
    // game.map[player_y][player_x].fruits = 0; //   Ezt visszakommentezve kavicsokat húz maga után ahogy lépked (pretty fun ngl)
    game.map[player_y][player_x].harvested = true;
    fruitsText.textContent = collectedFruits.toString();
}
function dashFruitGathering(dashCoordinates) {
    // playerStart: 10, 1
    // playerEnd: 10, 8
    let startIndex = 0;
    let endIndex = 0;
    if (dashCoordinates[0][0] == dashCoordinates[1][0]) {
        startIndex = dashCoordinates[0][1];
        endIndex = dashCoordinates[1][1];
    }
    else {
        startIndex = dashCoordinates[0][0];
        endIndex = dashCoordinates[1][0];
    }
    for (let index = startIndex; index <= endIndex; index++) {
        if (dashCoordinates[0][0] == dashCoordinates[1][0]) {
            fruitGathering(dashCoordinates[0][0], index);
        }
        else {
            fruitGathering(index, dashCoordinates[0][1]);
        }
    }
    resetAbility('dash');
}
function teleportPlayer(x, y) {
    ploc.teleport(x, y);
    Generator(mapSize, ploc._position.x, ploc._position.y);
    fruitGathering(ploc._position.x, ploc._position.y);
    resetAbility('teleport');
}
function resetAbility(ability) {
    let button = document.querySelector('.activated');
    button?.classList.remove('activated');
    IsAbilityActivated = false;
    activatedAbility = '';
    game.collectedAbilities[ability]--;
    let abilityCount = document.querySelector(`#${ability}`);
    if (abilityCount != null) {
        abilityCount.textContent = game.collectedAbilities[ability].toString();
    }
}
function PlayerParam(id) {
    let loc = id.split(',');
    let x = parseInt(loc[0]);
    let y = parseInt(loc[1]);
    ploc = new Player(x, y);
    Generator(mapSize, x, y);
    fruitGathering(x, y);
    firstClick = false;
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
        if (e.key === 'q' && game.collectedAbilities['teleport'] > 0) {
            let button = document.querySelector('#button-teleport');
            if (button?.classList.contains('activated')) {
                button?.classList.remove('activated');
                IsAbilityActivated = false;
                activatedAbility = '';
            }
            else {
                if (!IsAbilityActivated) {
                    button?.classList.add('activated');
                    IsAbilityActivated = true;
                    activatedAbility = 'teleport';
                }
            }
            sensibleStep = false;
        }
        else if (e.key === 'w' && game.collectedAbilities['dash'] > 0) {
            let button = document.querySelector('#button-dash');
            if (button?.classList.contains('activated')) {
                button?.classList.remove('activated');
                IsAbilityActivated = false;
                activatedAbility = '';
            }
            else {
                if (!IsAbilityActivated) {
                    button?.classList.add('activated');
                    IsAbilityActivated = true;
                    activatedAbility = 'dash';
                }
            }
            sensibleStep = false;
        }
        else if (e.key === 'ArrowLeft' && game.map[ploc._position.y][ploc._position.x - 1].fruits != 0) {
            if (IsAbilityActivated && activatedAbility == 'dash') {
                dashFruitGathering(ploc.dashLeft(game.map));
            }
            else {
                ploc.moveLeft();
            }
        }
        else if (e.key === 'ArrowRight' && game.map[ploc._position.y][ploc._position.x + 1].fruits != 0) {
            if (IsAbilityActivated && activatedAbility == 'dash') {
                dashFruitGathering(ploc.dashRight(game.map));
            }
            else {
                ploc.moveRight();
            }
        }
        else if (e.key === 'ArrowUp' && game.map[ploc._position.y - 1][ploc._position.x].fruits != 0) {
            if (IsAbilityActivated && activatedAbility == 'dash') {
                dashFruitGathering(ploc.dashUp(game.map));
            }
            else {
                ploc.moveUp();
            }
        }
        else if (e.key === 'ArrowDown' && game.map[ploc._position.y + 1][ploc._position.x].fruits != 0) {
            if (IsAbilityActivated && activatedAbility == 'dash') {
                dashFruitGathering(ploc.dashDown(game.map));
            }
            else {
                ploc.moveDown();
            }
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
