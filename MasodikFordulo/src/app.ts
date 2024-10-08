import Game from "./Game.js";

const mapSize = 10;
let game = new Game(mapSize);

const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());

function Generator(size: number) {
    const gameDiv = document.querySelector('.game-table');
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
                // var img = document.createElement("img");
                span.className = 'field'
                span.textContent = null;
                // img.src = './hunor.jpg';
                div.append(span)
                // div!.append(img)
            }
            div.append(span);
            gameDiv!.append(div);
        }
    }
}

Generator(mapSize);