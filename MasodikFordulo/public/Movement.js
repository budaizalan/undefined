import Player from "./Player.js";
const p = Player;
const body = document.querySelector('.body');
body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        console.log('Left');
        p.moveUp();
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
