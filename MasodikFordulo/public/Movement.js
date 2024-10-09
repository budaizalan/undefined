import Player from "./Player.js";
import { playloc as Multiply } from './app.js';
let mulObject = new Multiply(20, 50);
mulObject.Mul();
const p = Player;
const body = document.querySelector('.body');
body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        console.log('Left');
    }
    else if (e.key === 'ArrowRight') {
        console.log('Right');
    }
    else if (e.key === 'ArrowUp') {
        console.log('Up');
    }
    else if (e.key === 'ArrowDown') {
        console.log('Down');
    }
});
