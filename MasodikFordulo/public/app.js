"use strict";
const gameDiv = document.getElementsByClassName('.game');
function Generator(size) {
    const gameDiv = document.querySelector('.game');
    for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
            let div = document.createElement('div');
            div.className = 'block';
            div.id = `${i}${j}`;
            if (j == size - 1) {
            }
            gameDiv.append(div);
        }
    }
}
Generator(10);
