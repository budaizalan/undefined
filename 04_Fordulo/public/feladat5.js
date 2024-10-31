"use strict";
let input = document.querySelector("#Input_bit");
let inputGenerate = document.querySelector("#Input_generate");
let generateButton = document.querySelector("#Input_generate");
function CalculateStatistics() {
    input.value = input.value.replaceAll(/[^0-1]/g, '');
    let inputText = input.value;
    DisplayResults([
        inputText.match(/1*/g)?.join("").length.toString(),
        inputText.match(/0*/g)?.join("").length.toString(),
        inputText.match(/1*/g)?.sort((x, y) => y.length - x.length)[0],
        inputText.match(/0*/g)?.sort((x, y) => y.length - x.length)[0],
        [
            inputText.match(/(01)*/g)?.sort((x, y) => y.length - x.length)[0],
            inputText.match(/(10)*/g)?.sort((x, y) => y.length - x.length)[0]
        ].sort((x, y) => y.length - x.length)[0]
    ]);
}
function DisplayResults(results) {
    document.querySelector("#Total1").innerHTML = results[0];
    document.querySelector("#Total0").innerHTML = results[1];
    document.querySelector("#Longest1").innerHTML = results[2];
    document.querySelector("#Longest0").innerHTML = results[3];
    document.querySelector("#Longest_changing").innerHTML = results[4];
}
function GenerateBinaryNumber() {
    input.value = "";
    if (inputGenerate.value != "") {
        for (let i = 1; i <= Math.abs(+inputGenerate.value); i++) {
            input.value += Math.round(Math.random());
        }
    }
}
input.addEventListener("input", CalculateStatistics);
document.querySelector("#Button_generate").addEventListener("click", GenerateBinaryNumber);
