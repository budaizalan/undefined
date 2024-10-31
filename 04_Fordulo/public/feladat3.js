"use strict";
const start = document.getElementById("start");
const amount = document.getElementById("amount");
const numbersHolder = document.getElementById("numbers");
const numbersListHolder = document.getElementById("numberslist");
const startButton = document.getElementById("startBtn")?.addEventListener('click', Generate);
const lottoMap = document.getElementById("lottomap");
let drawnNumbers = [];
let tips = [];
function Generate() {
    lottoMap.innerHTML = "";
    numbersHolder.innerHTML = "";
    numbersListHolder.innerHTML = "";
    let many = Number(amount?.value);
    for (let i = 1; i < many + 1; i++) {
        var itemHolder = document.createElement('div');
        itemHolder.classList.add('itemholder');
        var itemText = document.createElement('ul');
        var itemInput = document.createElement('input');
        itemInput.style.setProperty("width", "50px");
        itemInput.classList.add("tip" + i.toString());
        itemText.textContent = i.toString() + " tipp";
        itemHolder.appendChild(itemText);
        itemHolder.appendChild(itemInput);
        numbersListHolder.appendChild(itemHolder);
    }
    numbersHolder?.appendChild(numbersListHolder);
    let textBtn = document.createElement('button');
    let textNode = document.createElement('p');
    textNode.textContent = "Fehér szín: Játékos tippjei | Piros szín: Gép tippjei | Zöld szín: Találat";
    textNode.style.paddingTop = "15px";
    textBtn.classList.add("gamestart");
    textBtn.textContent = "Indítás";
    numbersHolder.appendChild(textBtn);
    numbersHolder.appendChild(textNode);
    GenerateMap();
}
function GenerateMap(tips, drawntips) {
    lottoMap.innerHTML = "";
    lottoMap.style.gridTemplateColumns = `repeat(${Math.sqrt(100)}, 1fr)`;
    lottoMap.style.gridTemplateRows = `repeat(${Math.sqrt(100)}, 1fr)`;
    let matchPoint = [];
    for (let i = 1; i < Number(start?.value) + 1; i++) {
        const cell = document.createElement("div");
        if (tips) {
            if (tips.includes(i.toString())) {
                cell.style.background = "white";
                cell.style.color = "black";
            }
            tips.forEach(element => {
                if (drawntips?.includes(element)) {
                    console.log(element);
                    matchPoint.push(Number(element));
                }
            });
        }
        if (drawntips?.includes(i.toString())) {
            cell.style.background = "red";
            cell.style.color = "black";
        }
        if (matchPoint.includes(i)) {
            cell.style.background = "green";
        }
        cell.classList.add("cell");
        cell.textContent = i.toString();
        lottoMap.appendChild(cell);
    }
    document.querySelector(".gamestart")?.addEventListener('click', Game);
}
let ok = true;
function Game() {
    for (let i = 1; i < Number(amount?.value) + 1; i++) {
        let actualNumber = document.querySelector(`.tip${i.toString()}`);
        if (actualNumber.value.length == 0) {
            alert("A mezők nem lehetnek üresek");
            ok = false;
        }
        else if (actualNumber.value.toString() == "0" && ok) {
            alert("A mezők értékei nem lehetnek nullák");
            ok = false;
        }
        else if (Number(actualNumber.value.toString()) > Number(start?.value) && ok) {
            alert("A mezők értékei nem lehetnek nagyobbak mint a maximum húzható szám");
            ok = false;
        }
        else if (tips.includes(actualNumber.value.toString()) && ok) {
            alert("A mezők értékei nem lehetnek egyformák");
            ok = false;
        }
        console.log(ok);
        if (ok == true) {
            tips.push(actualNumber.value.toString());
            let randomNumberTry = 0;
            let randomNumber = 0;
            drawnNumbers = [];
            while (drawnNumbers.length != Number(amount?.value)) {
                // for (let i = 0; i < Number(amount?.value); i++) {
                randomNumberTry = Math.round(Math.random() * 100);
                if (randomNumberTry < Number(start?.value)) {
                    randomNumber = randomNumberTry;
                }
                if (!drawnNumbers.includes(randomNumber.toString()) && randomNumber != 0) {
                    drawnNumbers.push(randomNumber.toString());
                }
            }
            GenerateMap(tips, drawnNumbers);
            console.log(drawnNumbers);
        }
    }
}
