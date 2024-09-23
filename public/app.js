const fizetett = document.getElementById("fizetett");
const datum = new Date(document.getElementById("inputDate").value);
var slider = document.getElementById("Beza");
var output = document.getElementById("display");
output.innerHTML = slider.value;

slider.oninput = function() {
    Zsa();
  output.innerHTML = this.value;
}

fizetett.oninput = function() {
    let fizetetts = fizetett.value
    
    if (fizetetts.length < 3) {
        fizetett.value = fizetett.value * 1000;
    }
}