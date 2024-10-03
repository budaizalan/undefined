const gameDiv = document.getElementsByClassName('.game');
const mapSize = 10;

const root = document.documentElement;
root.style.setProperty('--map-size', mapSize.toString());

function Generator(size: number) {
    const gameDiv = document.querySelector('.game');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.setAttribute('x', i.toString());
            div.setAttribute('y', j.toString());
            gameDiv!.append(div);
        }
    }
}

Generator(mapSize);