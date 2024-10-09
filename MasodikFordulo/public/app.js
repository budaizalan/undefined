import Game from "./Game.js";
import Player from "./Player.js";
const mapSize = 10;
let firstClick = true;
let game = new Game(mapSize);
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
        console.log(id);
        let loc = id.split(',');
        let p = new Player(parseInt(loc[0]), parseInt(loc[1]));
        console.log(p);
        firstClick = false;
    }
}
Generator(mapSize);
