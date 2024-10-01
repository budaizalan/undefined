"use strict";
import Tankage from "./Tankage.js";
const cost = document.getElementById("fizetett");
const inputDateElement = document.getElementById("inputDate");
var slider = document.getElementById("Beza");
var output = document.getElementById("display");
const kmMeterStatus = document.getElementById("kilometerAllas");
const fuelTotal = document.querySelector('#fuelTotal');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
let TANKAGES = [];
if (output && slider) {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        if (output) {
            output.innerHTML = this.value;
        }
    };
}
if (cost) {
    cost.onblur = function () {
        if (isNaN(+cost?.value))
            cost.value = "";
        cost.value = `${Math.abs(+cost.value)}`;
    };
}
function Add_new_tankage(e) {
    e.preventDefault();
    if (+cost?.value <= 0) {
        alert("Az fizetett mező kitöltése nem megfelelő!");
        return;
    }
    if (inputDateElement?.valueAsDate == null) {
        alert("Az dátum mező kitöltése nem megfelelő!");
        return;
    }
    if (TANKAGES.length != 0) {
        if (+kmMeterStatus?.value < TANKAGES[TANKAGES.length - 1].km_meter_status) {
            alert("A km óra állása nem lehet kisebb az előző bevitt értéknél!");
            return;
        }
        if (inputDateElement?.valueAsDate < TANKAGES[TANKAGES.length - 1].date_full) {
            alert("A tankolás dátuma nem lehet kisebb az előző bevitt értéknél!");
            return;
        }
    }
    if (isNaN(+kmMeterStatus?.value)) {
        alert("Az km óra mező kitöltése nem megfelelő!");
        return;
    }
    TANKAGES.push(new Tankage(slider.value, inputDateElement?.valueAsDate, cost.value, kmMeterStatus.value));
    kmMeterStatus.value = `${TANKAGES[TANKAGES.length - 1].km_meter_status}`;
    generateTableContent();
}
function filterTankages() {
    if (startDate?.valueAsDate != null && endDate?.valueAsDate != null)
        return TANKAGES.filter(t => t.date_full >= startDate?.valueAsDate && t.date_full <= endDate?.valueAsDate);
    else {
        if (startDate?.valueAsDate != null)
            return TANKAGES.filter(t => t.date_full >= startDate?.valueAsDate);
        if (endDate?.valueAsDate != null)
            return TANKAGES.filter(t => t.date_full <= endDate?.valueAsDate);
    }
    return TANKAGES;
}
function generateTableContent() {
    let tankages = filterTankages();
    let totalFuel = 0;
    let table = document.querySelector('tbody');
    table.innerHTML = "";
    tankages?.forEach(t => {
        totalFuel += t.fuel_amount;
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.fuel_amount}</td>
            <td>${getFormattedDate(t.date_full)}</td>
            <td>${t.cost}</td>
            <td>${t.km_meter_status}</td>
        `;
        table.append(tr);
    });
    fuelTotal.innerHTML = `Össztankolás: ${totalFuel} l`;
}
function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}
function fillDatePicker() {
    inputDateElement.value = inputDateElement.min = new Date().toISOString().split("T")[0];
}
window.onload = () => {
    fillDatePicker();
};
document.getElementById("addTankage")?.addEventListener('click', Add_new_tankage);
startDate?.addEventListener('change', generateTableContent);
endDate?.addEventListener('change', generateTableContent);
