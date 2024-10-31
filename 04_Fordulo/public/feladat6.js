"use strict";
let table = document.querySelector("table");
let coverDiv = document.querySelector(".cover");
let previousTd = null;
let correctTds = [];
function GenerateGame() {
    let letters = new Set();
    while (letters.size != 8) {
        letters.add(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }
    let letterString = "";
    letters.forEach(l => letterString += l);
    GenerateTds(letterString);
    GenerateTds(letterString);
}
function GenerateTds(_letters) {
    let tr = document.createElement("tr");
    let copiedLetters = _letters.split('');
    // console.log(copiedLetters);
    for (let i = 0; i < _letters.length; i++) {
        let td = document.createElement("td");
        td.addEventListener('click', CheckValidPair);
        let selectedLetter = Math.floor(Math.random() * copiedLetters.length);
        td.innerHTML += `<span style="visibility: hidden;">${copiedLetters[selectedLetter]}</span>`;
        copiedLetters.splice(selectedLetter, 1);
        // console.log(copiedLetters);
        tr.append(td);
        if ((i + 1) % 4 == 0) {
            table?.append(tr);
            tr = document.createElement("tr");
        }
    }
}
function CheckValidPair(e) {
    let clickedTd = e.target;
    if (correctTds.includes(clickedTd)) {
        return;
    }
    if (!previousTd) {
        // console.log("1");        
        previousTd = clickedTd;
        SwitchVisibility(false, previousTd);
        return;
    }
    if (previousTd == clickedTd) {
        // console.log("2");        
        SwitchVisibility(true, clickedTd);
        previousTd = null;
        return;
    }
    if (clickedTd.children[0].innerHTML == previousTd.children[0].innerHTML) {
        // console.log('3');
        SwitchVisibility(false, clickedTd);
        correctTds.push(clickedTd, previousTd);
        previousTd = null;
    }
    else {
        // console.log("4");   
        coverDiv.style.display = "block";
        SwitchVisibility(false, clickedTd);
        setTimeout(() => {
            SwitchVisibility(true, clickedTd),
                SwitchVisibility(true, previousTd),
                previousTd = null,
                coverDiv.style.display = "none";
        }, 1000);
    }
    CheckEndGame();
}
function CheckEndGame() {
    if (correctTds.length == 16)
        document.querySelector(".victory").style.display = "block";
}
function SwitchVisibility(_hide, _td) {
    _td.children[0].style.visibility = _hide ? "hidden" : "visible";
}
GenerateGame();
