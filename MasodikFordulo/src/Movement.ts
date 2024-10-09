import Player from "./Player.js";

const p = Player;

const body = document.querySelector('.body');

body!.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'ArrowLeft') {
        console.log('Left');
        p.moveUp()
    } else if ((e as KeyboardEvent).key === 'ArrowRight') {
        console.log('Right');
        
    } else if ((e as KeyboardEvent).key === 'ArrowUp') {
        console.log('Up');
        
    } else if ((e as KeyboardEvent).key === 'ArrowDown') {
        console.log('Down');
        
    }
}); 