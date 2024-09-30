import Tankage from "./Tankage";

const fizetett = document.getElementById("fizetett") as HTMLInputElement | null;
const inputDateElement = document.getElementById("inputDate") as HTMLInputElement | null;
const datum = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza") as HTMLInputElement | null;
var output = document.getElementById("display") as HTMLElement | null;
const kmMeterStatus = document.getElementById("kilometerAllas") as HTMLInputElement |null;

let TANKAGES: Tankage[] = [];


if (output && slider) {
    output.innerHTML = slider.value;

    slider.oninput = function() {
        // Zsa();
        if (output) {
            output.innerHTML = (this as HTMLInputElement).value; 
            console.log(output);                       
        }
    }
}

if (fizetett) {
    fizetett.onblur = function() {
        let fizetetts = fizetett.value;
        
        if (fizetetts.length < 3) {
            fizetett.value = (parseInt(fizetett.value) * 1000).toString();
        }
    }
}

function Add_new_tankage(e: Event){
    e.preventDefault();
    TANKAGES.push(new Tankage(slider!.value, datum, fizetett!.value, kmMeterStatus!.value))
    console.log(TANKAGES);    
}

(document.getElementById("addTankage") as HTMLElement | null)?.addEventListener('click', Add_new_tankage);