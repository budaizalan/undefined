import { StartGame } from "./render.js";
const levelSelect = document.querySelector(".levelSelect");
const retryBtn = document.querySelector(".retrybtn").addEventListener('click', retry);
const exitBtn = document.querySelector(".exitbtn").addEventListener('click', openDialog);
const firstMap = document.getElementById("map1").addEventListener('click', map1);
const secondMap = document.getElementById("map2").addEventListener('click', map2);
const thirdMap = document.getElementById("map3").addEventListener('click', map3);
const openNavigation = document.querySelector(".menuSpan").addEventListener('click', openNav);
const closeNavigation = document.querySelector(".closebtn").addEventListener('click', closeNav);
const endGame = document.getElementById("endGame");
let currentLevel;
function retry() {
    endGame.style.display = "none";
    closeNav();
    closeLevelSelect();
    if (currentLevel) {
        StartGame(currentLevel);
    }
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
export function openDialog() {
    endGame.style.display = "none";
    if (levelSelect) {
        levelSelect.style.display = "block";
    }
    closeNav();
}
function closeLevelSelect() {
    if (levelSelect) {
        levelSelect.style.display = "none";
    }
}
function map1() {
    closeLevelSelect();
    currentLevel = 1;
    StartGame(currentLevel);
}
function map2() {
    closeLevelSelect();
    currentLevel = 2;
    StartGame(currentLevel);
}
function map3() {
    closeLevelSelect();
    currentLevel = 3;
    StartGame(currentLevel);
}
