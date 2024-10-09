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
export { PlayerLocation as playloc } from "./app.js";
export class PlayerLocation {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Mul() {
        console.log("mul:" + (this.x * this.y));
    }
}
function PlayerParam(id) {
    if (firstClick) {
        let loc = id.split(',');
        let p = new Player(parseInt(loc[0]), parseInt(loc[1]));
        console.log(p._position);
        firstClick = false;
    }
}
Generator(mapSize);
