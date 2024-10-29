import Game from "./models/Game.js";
import Levels from "./models/Levels.js";
import { StartGame } from "./render.js";

const dialog = document.querySelector(".menu");
const retryBtn = document.querySelector(".retrybtn")!.addEventListener('click', retry);
const exitBtn = document.querySelector(".exitbtn")!.addEventListener('click', openDialog);
const firstMap = document.getElementById("map1")!.addEventListener('click', map1);
const secondMap = document.getElementById("map2")!.addEventListener('click', map2);
const thirdMap = document.getElementById("map3")!.addEventListener('click', map3);
const openNavigation = document.querySelector(".menuSpan")!.addEventListener('click', openNav);
const closeNavigation = document.querySelector(".closebtn")!.addEventListener('click', closeNav);

let currentCoord: number;

function retry(){
    const coord: Array<number> = [Levels.levels[0].cities[currentCoord].position.q, Levels.levels[0].cities[currentCoord].position.r];
    console.log(coord);
    Game.AdjustParams(coord);
    StartGame(); 
}

function openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
}

function openDialog(){
    dialog?.classList.remove("hide");
    let joe: Array<number> = [-4, -2]
    closeNav();
}

function closeDialog(){
    if(dialog){
        (dialog as HTMLElement).style.visibility = "hidden";
    }
    // dialog!.forEach(a => a.classList.add("hide"));
}



function map1(){
    currentCoord = 0;
    for (let i = 0; i < 3; i++) {
        const coord: Array<number> = [Levels.levels[0].cities[i].position.q, Levels.levels[0].cities[i].position.r];
        console.log(coord);
        Game.AdjustParams(coord);
        StartGame();   
    }
    closeDialog();
    
}

function map2(){
    currentCoord = 1;
    for (let i = 0; i < 3; i++) {
        const coord: Array<number> = [Levels.levels[1].cities[i].position.q, Levels.levels[1].cities[i].position.r];
        // const coord: Levels = Levels.levels[1];
        console.log(coord);
        Game.AdjustParams(coord);
        StartGame();   
    }
    closeDialog();
    
}

function map3(){
    currentCoord = 2;
    for (let i = 0; i < 3; i++) {
        const coord: Array<number> = [Levels.levels[2].cities[i].position.q, Levels.levels[2].cities[i].position.r];
        console.log(coord);
        Game.AdjustParams(coord);
        StartGame();   
    }
    closeDialog();
    
}
