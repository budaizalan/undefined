let fizetett = document.getElementById("fizetett") as HTMLInputElement;
const inputDateElement = document.getElementById(
  "inputDate"
) as HTMLInputElement | null;
const datum = inputDateElement ? new Date(inputDateElement.value) : new Date();
var slider = document.getElementById("Beza") as HTMLInputElement | null;
var output = document.getElementById("display") as HTMLElement | null;
const hozzaad = document.getElementById("hozzaad") as HTMLButtonElement | null;

hozzaad?.addEventListener("click", Calc);

function Calc() {
 let fizetettv;
  var inputDate = new Date(datum).toISOString().slice(0, 10);
  console.log(fizetett?.value, inputDate);
  if (fizetett.value.toString().length < 4) {
    fizetettv = parseInt(fizetett.value) * 1000
  } else {
    fizetettv = fizetett.value;
  }
  const Holder = document.querySelector(".sumRec");
  var divElement = document.createElement("Div");
  divElement.className = "tankolasRecord";
  var text = document.createTextNode(
    `${inputDate} dátumon: ${slider?.value} litert tankolt ${fizetettv} forintért`
  );
  divElement.appendChild(text);
  Holder?.append(divElement)
  console.log("done");
  
}

if (output && slider) {
  output.innerHTML = slider.value;

  slider.oninput = function () {
    console.log("fasz");

    if (output) {
      output.innerHTML = (this as HTMLInputElement).value;
    }
  };
}
