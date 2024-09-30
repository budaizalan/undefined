"use strict";
import Tankage from "./Tankage.js";
const cost = document.getElementById("fizetett");
const inputDateElement = document.getElementById("inputDate");
var slider = document.getElementById("Beza");
var output = document.getElementById("display");
const kmMeterStatus = document.getElementById("kilometerAllas");
const selectMonths = document.querySelector('#selectMonths');
const fuelTotal = document.querySelector('#fuelTotal');
const startDay = document.querySelector('#startDay');
const endDay = document.querySelector('#endDay');
let TANKAGES = [];
if (output && slider) {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        // Zsa();
        if (output) {
            output.innerHTML = this.value;
            console.log(output);
        }
    };
}
if (cost) {
    cost.onblur = function () {
        let fizetetts = cost.value;
        if (fizetetts.length < 3) {
            cost.value = (parseInt(cost.value) * 1000).toString();
        }
    };
}
function Add_new_tankage(e) {
    e.preventDefault();
    if (isNaN(+cost?.value) || inputDateElement?.valueAsDate == null || isNaN(+kmMeterStatus?.value)) {
        alert("Az űrlap mezői nem megfelelőek!");
        return;
    }
    TANKAGES.push(new Tankage(slider.value, inputDateElement?.valueAsDate, cost.value, kmMeterStatus.value));
    console.log(inputDateElement?.valueAsDate);
    console.log(TANKAGES);
    filterTankages();
}
function generateMonthsForSelect() {
    const months_hun = ["Nincs szűrés", "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    for (let i = 0; i < 13; i++) {
        let option = document.createElement('option');
        option.value = `${i - 1}`;
        option.innerHTML = `${months_hun[i]}`;
        selectMonths?.append(option);
    }
}
function filterTankages() {
    let filteredTankages = TANKAGES.filter(t => t.month.toString().includes(selectMonths?.value != "-1" ? selectMonths?.value : ""));
    if (startDay?.value != "" && endDay?.value != "") {
        filteredTankages = filteredTankages.filter(t => t.day <= +endDay?.value && t.day >= +startDay?.value);
    }
    else
        correctDayPicker();
    generateTableContent(filteredTankages);
}
function generateTableContent(tankages) {
    let totalFuel = 0;
    let table = document.querySelector('tbody');
    table.innerHTML = "";
    tankages.forEach(t => {
        totalFuel += t.fuel_amount;
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.fuel_amount}</td>
            <td>${getFormattedDate(t.date_full)}</td>
            <td>${t.cost}</td>
            <td>${kmMeterStatus?.value}</td>
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
function correctDayPicker() {
    if (+startDay?.value < 1 || +startDay?.value > 31)
        startDay.value = "";
    if (+endDay?.value < 1 || +endDay?.value > 31)
        endDay.value = "";
}
window.onload = () => {
    generateMonthsForSelect();
};
document.getElementById("addTankage")?.addEventListener('click', Add_new_tankage);
selectMonths?.addEventListener('change', filterTankages);
startDay?.addEventListener('change', filterTankages);
endDay?.addEventListener('change', filterTankages);
