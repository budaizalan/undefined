const fizetett = document.getElementById("fizetett") as HTMLInputElement | null;
const inputDateElement = document.getElementById("inputDate") as HTMLInputElement | null;
const datum = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza") as HTMLInputElement | null;
var output = document.getElementById("display") as HTMLElement | null;

if (output && slider) {
    output.innerHTML = slider.value;

    slider.oninput = function() {
        // Zsa();
        if (output) {
            output.innerHTML = (this as HTMLInputElement).value;
        }
    }
}

if (fizetett) {
    fizetett.oninput = function() {
        let fizetetts = fizetett.value;
        
        if (fizetetts.length < 3) {
            fizetett.value = (parseInt(fizetett.value) * 1000).toString();
        }
    }
}