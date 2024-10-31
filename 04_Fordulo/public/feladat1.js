"use strict";
const inputData = document.getElementById("inputTxt");
const holder = document.getElementById("holder");
const list = document.getElementById("list");
const calcButton = document.getElementById("calc")?.addEventListener('click', Calc);
let resultLength = 0;
let conquerors = [];
var result = [];
function Calc() {
    resultLength = 0;
    conquerors = [];
    result = [];
    list.innerHTML = "";
    let input = Number(inputData?.value);
    if (2 < input && input < 100) {
        for (let i = 0; i < input; i++) {
            if (i !== 1 && i !== input && input % i == 0) {
                result.push(i);
            }
        }
        resultLength = result.length;
        getDivisors();
        Print();
    }
}
function getDivisors() {
    var actualResult = [];
    for (let i = 0; i < 100; i++) {
        actualResult = [];
        for (let j = 0; j < i; j++) {
            if (j !== 1 && j !== i && i % j == 0) {
                actualResult.push(j);
            }
        }
        if (actualResult.length < resultLength) {
            conquerors.push(i);
        }
    }
}
function Print() {
    if (conquerors.length !== 0) {
        for (var i = 0; i < conquerors.length; i++) {
            var item = document.createElement('li');
            item.textContent = conquerors[i].toString();
            list.appendChild(item);
        }
    }
    else {
        var item = document.createElement('li');
        item.textContent = "Nincs olyan szám amelynek kevesebb osztója lenne";
        list.appendChild(item);
    }
    holder?.appendChild(list);
}
