import Game from "./Game.js";
import Player from "./Player.js";
const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
let ploc = new Player(0, 0);
// console.log(ploc);
const gameDiv = document.querySelector('.game-table');
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
function PlayerParam(id) {
    if (firstClick) {
        let loc = id.split(',');
        ploc = new Player(parseInt(loc[0]), parseInt(loc[1]));
        Generator(mapSize, parseInt(loc[0]), parseInt(loc[1]));
        firstClick = false;
    }
}
const body = document.querySelector('.body');
body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && game.map[ploc._position.x][ploc._position.y - 1].fruits != 0) {
        ploc.moveLeft();
        Generator(mapSize, ploc._position.x, ploc._position.y);
    }
    else if (e.key === 'ArrowRight' && game.map[ploc._position.x][ploc._position.y + 1].fruits != 0) {
        ploc.moveRight();
        Generator(mapSize, ploc._position.x, ploc._position.y);
    }
    else if (e.key === 'ArrowUp' && game.map[ploc._position.x - 1][ploc._position.y].fruits != 0) {
        ploc.moveUp();
        Generator(mapSize, ploc._position.x, ploc._position.y);
    }
    else if (e.key === 'ArrowDown' && game.map[ploc._position.x + 1][ploc._position.y].fruits != 0) {
        ploc.moveDown();
        Generator(mapSize, ploc._position.x, ploc._position.y);
    }
});
Generator(mapSize, 0, 0);
