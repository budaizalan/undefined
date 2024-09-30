import Tankage from "./Tankage";

const cost = document.getElementById("fizetett") as HTMLInputElement | null;
const inputDateElement = document.getElementById("inputDate") as HTMLInputElement | null;
// const date = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza") as HTMLInputElement | null;
var output = document.getElementById("display") as HTMLElement | null;
const kmMeterStatus = document.getElementById("kilometerAllas") as HTMLInputElement |null;
const selectMonths = document.querySelector('#selectMonths') as HTMLSelectElement | null;

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

if (cost) {
    cost.onblur = function() {
        let fizetetts = cost.value;
        
        if (fizetetts.length < 3) {
            cost.value = (parseInt(cost.value) * 1000).toString();
        }
    }
}

function Add_new_tankage(e: Event){
    e.preventDefault();
    TANKAGES.push(new Tankage(slider!.value, inputDateElement?.valueAsDate!, cost!.value, kmMeterStatus!.value))
    console.log(inputDateElement?.valueAsDate!);
    console.log(TANKAGES); 
    filterTankages();  
}

function generateMonthsForSelect() : void {
    const months_hun: string[] = ["Nincs szűrés", "Január", "Február", "Március", "Április", "Május", "Június", "Július","Augusztus","Szeptember","Október","November","December"];
    for (let i = 0; i < 13; i++) {  
        let option: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        option.value = `${i-1}`
        option.innerHTML=`${months_hun[i]}`;        
        selectMonths?.append(option);
    }
}

function filterTankages(): void{
    let filteredTankages: Tankage[] = TANKAGES.filter(t => t.month.toString().includes(selectMonths?.value! != "-1" ? selectMonths?.value! : ""))
    generateTableContent(filteredTankages);
}

function generateTableContent(tankages: Tankage[]): void {
    let table: HTMLElement = document.querySelector('tbody') as HTMLElement;
    table.innerHTML = "";
    tankages.forEach(t => {
        let tr: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
        tr.innerHTML = `
            <td>${t.fuel_amount}</td>
            <td>${getFormattedDate(t.date_full)}</td>
            <td>${t.cost}</td>
        `
        table.append(tr);
    });
}

function getFormattedDate(date: Date) {
    let year: number = date.getFullYear();
    let month: string = (1 + date.getMonth()).toString().padStart(2, '0');
    let day: string = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}

window.onload = () => {
    generateMonthsForSelect();
}


(document.getElementById("addTankage") as HTMLElement | null)?.addEventListener('click', Add_new_tankage);
selectMonths?.addEventListener('change', filterTankages);