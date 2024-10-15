import Cell, { ProtoCell } from "./Cell.js";
import Game from "./Game.js";
import Player from "./Player.js";

const mapSize = 10;
let game = new Game(mapSize, 10);
let ploc: Player = new Player(0,0);
let numberOfTries = 1;
let numberOfGames = 0;
let onAfterScreen = false;
let IsAbilityActivated = false;
let activatedAbility = '';
const records: number[] = [];
const stepsText = document.querySelector('#game-steps');
const fruitsText = document.querySelector('#game-fruits');
const bestTryText = document.querySelector('#besttry');
const gameDiv = document.querySelector('.game-table');
const scoreboardText = document.querySelector('.game-scoreboard');
const body = document.querySelector('.body');
stepsText!.textContent = game.steps.toString();
const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());

let duplicatedCells: ProtoCell[] = [];
let originalFruits: number[] = [];

function Generator(size: number, player_x: number, player_y: number) {
    gameDiv!.textContent = '';
    for (let i = 1; i < size+1; i++) {
        for (let j = 1; j < size+1; j++) {
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
            } else {
                span.addEventListener("click", () => 
                    {
                        if(game.firstClick){
                            PlayerParam(div.id);
                        } else{
                            if(IsAbilityActivated && activatedAbility == 'teleport'){
                               teleportPlayer(parseInt(div.getAttribute('x')!), parseInt(div.getAttribute('y')!));
                            }
                        }
                    }, false);
            }
            if(game.showAbilities){
                if(game.map[i][j] instanceof Cell){
                    if((game.map[i][j] as Cell).ability != null && !(game.map[i][j] as Cell).abilityCollected){
                        span.classList.add('ability');
                        span.classList.add('ability-' + (game.map[i][j] as Cell).ability);
                    }
                }
            }
            if ((game.map[i][j] as Cell).harvested){
                span.textContent = '';
            }
            if (i == player_y && j == player_x) {
                span.classList.add('Player');
                div.textContent = '';
                span.textContent = '';
            }
            div.append(span);
            gameDiv!.append(div);
        }
    }
}

function fruitGathering(x: number, y: number) {
    if(!(game.map[y][x] as Cell).harvested){
        game.collectedFruits += game.map[y][x].fruits;
    }
    if((game.map[y][x] as Cell).ability != null && !(game.map[y][x] as Cell).abilityCollected){
        let ability = (game.map[y][x] as Cell).ability as string;
        game.AddCollectedAbilities(ability);
        let abilityCount = document.querySelector(`#${ability}`);
        if(abilityCount != null){
            abilityCount!.textContent = game.collectedAbilities[ability].toString();
        }
        (game.map[y][x] as Cell).abilityCollected = true;
    }
    // game.map[player_y][player_x].fruits = 0; //   Ezt visszakommentezve kavicsokat húz maga után ahogy lépked (pretty fun ngl)
    (game.map[y][x] as Cell).harvested = true;
    fruitsText!.textContent = game.collectedFruits.toString();
}

function dashFruitGathering(dashCoordinates: Array<Array<number>>){
    let startIndex = 0;
    let endIndex = 0;
    if(dashCoordinates[0][0] == dashCoordinates[1][0]){
        startIndex = dashCoordinates[0][1];
        endIndex = dashCoordinates[1][1];
    } else{
        startIndex = dashCoordinates[0][0];
        endIndex = dashCoordinates[1][0];
    }
    for (let index = startIndex; index <= endIndex; index++) {
        if(dashCoordinates[0][0] == dashCoordinates[1][0]){
            fruitGathering(dashCoordinates[0][0], index);
        } else{
            fruitGathering(index, dashCoordinates[0][1]);
        }
    }
    resetAbility('dash');
}

function teleportPlayer(x: number, y: number){
    ploc.teleport(x, y);
    Generator(mapSize, ploc._position.x, ploc._position.y);
    fruitGathering(ploc._position.x, ploc._position.y);
    resetAbility('teleport');
}

function harvestAround(x: number, y: number){
    for (let i = y-1; i <= y+1; i++) {
        for (let j = x-1; j <= x+1; j++) {
            if(game.map[i][j].fruits != 0){
                fruitGathering(j, i);
            }
        }
    }
    // wait 1 sec
    setTimeout(() => {
        resetAbility('harvest');
    }, 250);
}

function duplicateFruits(x: number, y: number){
    for (let i = y-1; i <= y+1; i++) {
        for (let j = x-1; j <= x+1; j++) {
            if(game.map[i][j].fruits != 0){
                if(!duplicatedCells.includes(game.map[i][j]))duplicatedCells.push(game.map[i][j]); originalFruits.push(game.map[i][j].fruits);
                game.map[i][j].fruits *= 2;
            }
        }
    }
    setTimeout(() => {
        resetAbility('duplicate');
    }, 250);
}

function resetAbility(ability: string){
    let button = document.querySelector('.activated');
    button?.classList.remove('activated');
    IsAbilityActivated = false;
    activatedAbility = '';
    game.collectedAbilities[ability]--;
    let abilityCount = document.querySelector(`#${ability}`);
    if(abilityCount != null){
        abilityCount!.textContent = game.collectedAbilities[ability].toString();
    }
}

function resetAbilitiesCount(){
    game.abilities.forEach(ability => {
        let abilityCount = document.querySelector(`#${ability}`);
        if(abilityCount != null){
            abilityCount!.textContent = '0';
        }
    });
}

function PlayerParam(id: string){
    let loc = id.split(',');
    let x = parseInt(loc[0]);
    let y = parseInt(loc[1]);
    ploc = new Player(x,y);
    Generator(mapSize, x,y);
    fruitGathering(x, y)
    game.firstClick = false;
}


function Restart(){
    AddRecord();
    game.firstClick = true;
    game.steps = 10;
    game.collectedFruits = 0;
    resetAbilitiesCount();
    game.resetAbilities();
    fruitsText!.textContent = '0';
    stepsText!.textContent = game.steps.toString();
    numberOfTries++;
    game.map.forEach((row) => {
        row.forEach((cell) => {
            (cell as Cell).harvested = false;
            (cell as Cell).abilityCollected = false;
            if(duplicatedCells.includes(cell)) cell.fruits = originalFruits[duplicatedCells.indexOf(cell)];
        });
    });
    onAfterScreen = false; 
    duplicatedCells = [];
    originalFruits = [];   
    Generator(mapSize, 0, 0);
}

function NewGame(){
    AddRecord();
    game.firstClick = true;
    game.steps = 10;
    game.collectedFruits = 0;
    resetAbilitiesCount();
    game.resetAbilities();
    numberOfGames++;
    numberOfTries = 1;
    fruitsText!.textContent = '0';
    stepsText!.textContent = game.steps.toString();
    scoreboardText!.textContent = 'Eredménytábla';
    let bestRecord = document.createElement('div')
    bestRecord.textContent = `Játszott körök: ${numberOfGames}`;
    scoreboardText!.appendChild(bestRecord);
    bestTryText!.textContent = '';
    game = new Game(mapSize, 10);
    onAfterScreen = false;
    duplicatedCells = [];
    originalFruits = []; 
    Generator(mapSize, 0, 0);
}

function AddRecord(){
    let record = document.createElement('div')
    record.textContent = `${numberOfTries}. fordulóban elért pontszám: ${game.collectedFruits}`
    let bestRecord = document.createElement('div')
    records.push(game.collectedFruits);
    bestTryText!.textContent = '';
    bestRecord.textContent = `Eddigi legjobb eredmény: ${records.reduce((a, b) => Math.max(a, b))}`;
    bestTryText!.appendChild(bestRecord);
    scoreboardText!.appendChild(record);
}

body!.addEventListener('keydown', (e) => {
    let sensibleStep = true;
    if (game.steps != 0) {
        if((e as KeyboardEvent).key === 'q' && game.collectedAbilities['teleport'] > 0){
            let button = document.querySelector('#button-teleport');
            if(button?.classList.contains('activated')){
                button?.classList.remove('activated');
                IsAbilityActivated = false;
                activatedAbility = '';
            } else{
                if(!IsAbilityActivated){
                    button?.classList.add('activated');
                    IsAbilityActivated = true;
                    activatedAbility = 'teleport';
                }
            }
            sensibleStep = false;
        }
        else if((e as KeyboardEvent).key === 'w' && game.collectedAbilities['dash'] > 0){
            let button = document.querySelector('#button-dash');
            if(button?.classList.contains('activated')){
                button?.classList.remove('activated');
                IsAbilityActivated = false;
                activatedAbility = '';
            } else{
                if(!IsAbilityActivated){
                    button?.classList.add('activated');
                    IsAbilityActivated = true;
                    activatedAbility = 'dash';
                }
            }
            sensibleStep = false;
        }
        else if((e as KeyboardEvent).key === 'e' && game.collectedAbilities['harvest'] > 0){
            let button = document.querySelector('#button-harvest');
            if(!IsAbilityActivated){
                button?.classList.add('activated');
                IsAbilityActivated = true;
                activatedAbility = 'harvest';
                harvestAround(ploc._position.x, ploc._position.y);
            }
            sensibleStep = false;
        }
        else if((e as KeyboardEvent).key === 'r' && game.collectedAbilities['duplicate'] > 0){
            let button = document.querySelector('#button-duplicate');
            if(!IsAbilityActivated){
                button?.classList.add('activated');
                IsAbilityActivated = true;
                activatedAbility = 'duplicate';
                duplicateFruits(ploc._position.x, ploc._position.y);
            }
            sensibleStep = false;
        }
        else if ((e as KeyboardEvent).key === 'ArrowLeft' && game.map[ploc._position.y][ploc._position.x-1].fruits != 0 ) {
            if(IsAbilityActivated && activatedAbility == 'dash'){
                dashFruitGathering(ploc.dashLeft(game.map));
            } else { 
                ploc.moveLeft();
            }
        } else if ((e as KeyboardEvent).key === 'ArrowRight' && game.map[ploc._position.y][ploc._position.x+1].fruits != 0 ) {
            if(IsAbilityActivated && activatedAbility == 'dash'){
                dashFruitGathering(ploc.dashRight(game.map));
            } else { 
                ploc.moveRight();
            }
        } else if ((e as KeyboardEvent).key === 'ArrowUp' && game.map[ploc._position.y-1][ploc._position.x].fruits != 0 ) {
            if(IsAbilityActivated && activatedAbility == 'dash'){
                dashFruitGathering(ploc.dashUp(game.map));
            } else{
                ploc.moveUp();
            }
        } else if ((e as KeyboardEvent).key === 'ArrowDown' && game.map[ploc._position.y+1][ploc._position.x].fruits != 0 ) {
            if(IsAbilityActivated && activatedAbility == 'dash'){
                dashFruitGathering(ploc.dashDown(game.map));
            } else{
                ploc.moveDown();
            }
        } else {
            sensibleStep = false;
        }
        Generator(mapSize, ploc._position.x, ploc._position.y)
        if (sensibleStep) {
            game.steps--;
            stepsText!.textContent = game.steps.toString();
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
        afterScreenText.textContent = `Gyüjtött gyümölcsök: ${game.collectedFruits.toString()}`;
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