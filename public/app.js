"use strict";
const fizetett = document.getElementById("fizetett");
const inputDateElement = document.getElementById("inputDate");
const datum = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza");
var output = document.getElementById("display");
if (output && slider) {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        // Zsa();
        if (output) {
            output.innerHTML = this.value;
        }
    };
}
if (fizetett) {
    fizetett.oninput = function () {
        let fizetetts = fizetett.value;
        if (fizetetts.length < 3) {
            fizetett.value = (parseInt(fizetett.value) * 1000).toString();
        }
    };
}
