import Tankage from "./Tankage.js";

const cost = document.getElementById("fizetett") as HTMLInputElement | null;
const inputDateElement = document.getElementById("inputDate") as HTMLInputElement | null;
var slider = document.getElementById("Beza") as HTMLInputElement | null;
var output = document.getElementById("display") as HTMLElement | null;
const kmMeterStatus = document.getElementById("kilometerAllas") as HTMLInputElement |null;
const fuelTotal = document.querySelector('#fuelTotal') as HTMLSpanElement | null;
const startDate = document.querySelector('#startDate') as HTMLInputElement | null;
const endDate = document.querySelector('#endDate') as HTMLInputElement | null;

let TANKAGES: Tankage[] = [];


if (output && slider) {
    output.innerHTML = slider.value;

    slider.oninput = function() {
        if (output) {
            output.innerHTML = (this as HTMLInputElement).value; 
        }
    }
}

if (cost) {
    cost.onblur = function() {
        if (isNaN(+cost?.value!)) cost.value = "";
        cost.value = `${Math.abs(+cost.value!)}`;
    }
}

function Add_new_tankage(e: Event): void{
    e.preventDefault();
    if (+cost?.value! <= 0) {
        alert("Az fizetett mező kitöltése nem megfelelő!");
        return;
    }
    if(inputDateElement?.valueAsDate == null){
        alert("Az dátum mező kitöltése nem megfelelő!");
        return;
    }
    if(TANKAGES.length != 0){
        if(+kmMeterStatus?.value! < TANKAGES[TANKAGES.length-1].km_meter_status){
            alert("A km óra állása nem lehet kisebb az előző bevitt értéknél!")
            return;
        }
        if (inputDateElement?.valueAsDate < TANKAGES[TANKAGES.length-1].date_full) {
            alert("A tankolás dátuma nem lehet kisebb az előző bevitt értéknél!")
            return;
        }
    }
    if (isNaN(+kmMeterStatus?.value!)) {
        alert("Az km óra mező kitöltése nem megfelelő!");
        return;
    }
    TANKAGES.push(new Tankage(slider!.value, inputDateElement?.valueAsDate!, cost!.value, kmMeterStatus!.value))
    kmMeterStatus!.value = `${TANKAGES[TANKAGES.length-1].km_meter_status}`;
    generateTableContent();  
}

function filterTankages(): Tankage[] | null {
    if(startDate?.valueAsDate != null && endDate?.valueAsDate != null)
        return TANKAGES.filter(t => t.date_full >= startDate?.valueAsDate! && t.date_full <= endDate?.valueAsDate!);
    else {
        if(startDate?.valueAsDate != null)
            return TANKAGES.filter(t => t.date_full >= startDate?.valueAsDate!);
        if(endDate?.valueAsDate != null) 
            return TANKAGES.filter(t => t.date_full <= endDate?.valueAsDate!);
    }        
    return TANKAGES;
}

function generateTableContent(): void {
    let tankages = filterTankages();
    let totalFuel: number = 0;
    let table: HTMLElement = document.querySelector('tbody') as HTMLElement;
    table.innerHTML = "";

    tankages?.forEach(t => {
        totalFuel += t.fuel_amount;
        let tr: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
        tr.innerHTML = `
            <td>${t.fuel_amount}</td>
            <td>${getFormattedDate(t.date_full)}</td>
            <td>${t.cost}</td>
            <td>${t.km_meter_status}</td>
        `
        table.append(tr);
    });
    fuelTotal!.innerHTML = `Össztankolás: ${totalFuel} l`;
}

function getFormattedDate(date: Date) {
    let year: number = date.getFullYear();
    let month: string = (1 + date.getMonth()).toString().padStart(2, '0');
    let day: string = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}

function fillDatePicker(){
    inputDateElement!.value = inputDateElement!.min = new Date().toISOString().split("T")[0];
}

window.onload = () => {
    fillDatePicker();    
}


(document.getElementById("addTankage") as HTMLElement | null)?.addEventListener('click', Add_new_tankage);
startDate?.addEventListener('change', generateTableContent);
endDate?.addEventListener('change', generateTableContent);