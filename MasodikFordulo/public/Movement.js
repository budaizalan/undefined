"use strict";
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
