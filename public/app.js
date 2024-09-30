"use strict";
import Tankage from "./Tankage.js";
const fizetett = document.getElementById("fizetett");
const inputDateElement = document.getElementById("inputDate");
const datum = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza");
var output = document.getElementById("display");
const kmMeterStatus = document.getElementById("kilometerAllas");
let TANKAGES = [];
if (output && slider) {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        console.log("fasz");
        if (output) {
            output.innerHTML = this.value;
            console.log(output);
        }
    };
}
if (fizetett) {
    fizetett.onblur = function () {
        let fizetetts = fizetett.value;
        if (fizetetts.length < 3) {
            fizetett.value = (parseInt(fizetett.value) * 1000).toString();
        }
    };
}
function Add_new_tankage(e) {
    e.preventDefault();
    TANKAGES.push(new Tankage(slider.value, datum, fizetett.value, kmMeterStatus.value));
    console.log(TANKAGES);
}
document.getElementById("addTankage")?.addEventListener('click', Add_new_tankage);
