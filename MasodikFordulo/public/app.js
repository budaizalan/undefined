import Game from "./Game.js";
import Player from "./Player.js";
const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
let ploc = new Player(0, 0);
// console.log(ploc);
const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());
function Generator(size) {
    const gameDiv = document.querySelector('.game-table');
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
            div.append(span);
            gameDiv.append(div);
        }
    }
}
function PlayerParam(id) {
    if (firstClick) {
        let loc = id.split(',');
        ploc = new Player(parseInt(loc[1]), parseInt(loc[0]));
        console.log(ploc);
        firstClick = false;
    }
}
const body = document.querySelector('.body');
body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        console.log('Left');
        ploc.moveLeft();
        console.log(ploc);
    }
    else if (e.key === 'ArrowRight') {
        console.log('Right');
        ploc.moveRight();
    }
    else if (e.key === 'ArrowUp') {
        console.log('Up');
        ploc.moveUp();
    }
    else if (e.key === 'ArrowDown') {
        console.log('Down');
        ploc.moveDown();
    }
});
console.log(ploc);
Generator(mapSize);
