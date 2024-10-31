let table = document.querySelector("table");
let coverDiv = document.querySelector(".cover") as HTMLDivElement;

let previousTd: HTMLTableCellElement | null = null;
let correctTds: HTMLTableCellElement[] = [];

function GenerateGame(){
    let letters: Set<string> = new Set<string>();
    while(letters.size != 8){
        letters.add(String.fromCharCode(65+Math.floor(Math.random() * 26)));        
    }    
    let letterString: string = "";
    letters.forEach(l => letterString+=l);
    GenerateTds(letterString);
    GenerateTds(letterString);
}

function GenerateTds(_letters: string){
    let tr: HTMLTableRowElement = document.createElement("tr"); 
    let copiedLetters: string[] = _letters.split('');
    // console.log(copiedLetters);
    

    for (let i = 0; i < _letters.length; i++) {
        let td = document.createElement("td");
        td.addEventListener('click', CheckValidPair);

        let selectedLetter: number = Math.floor(Math.random() * copiedLetters.length);
        td.innerHTML+=`<span style="visibility: hidden;">${copiedLetters[selectedLetter]}</span>`;
        copiedLetters.splice(selectedLetter, 1);
        // console.log(copiedLetters);
        
        tr.append(td);
         
        if((i+1) % 4 == 0){            
            table?.append(tr);
            tr = document.createElement("tr");
        }    
    }
}

function CheckValidPair(e: Event): void{
    let clickedTd: HTMLTableCellElement = (e.target as HTMLTableCellElement)
    if(correctTds.includes(clickedTd)){
        return;
    }
    if(!previousTd){
        // console.log("1");        
        previousTd = clickedTd;
        SwitchVisibility(false, previousTd);
        return;
    }
    if(previousTd == clickedTd){
        // console.log("2");        
        SwitchVisibility(true, clickedTd);
        previousTd = null
        return;
    }
    if((clickedTd.children[0] as HTMLSpanElement).innerHTML == (previousTd.children[0] as HTMLSpanElement).innerHTML){
        // console.log('3');
        SwitchVisibility(false, clickedTd); 
        correctTds.push(clickedTd, previousTd)       
        previousTd = null;
    }
    else{
        // console.log("4");   
        coverDiv.style.display = "block";
        SwitchVisibility(false, clickedTd);        
        setTimeout(()=>{
            SwitchVisibility(true, clickedTd),
            SwitchVisibility(true, previousTd!),
            previousTd = null,
            coverDiv.style.display = "none"
        }, 1000);       
    }
    CheckEndGame();
}

function CheckEndGame(){
    if(correctTds.length == 16)
        (document.querySelector(".victory") as HTMLDivElement).style.display = "block";
}

function SwitchVisibility(_hide: boolean, _td: HTMLTableCellElement): void{
    (_td.children[0] as HTMLSpanElement).style.visibility = _hide ? "hidden" : "visible";
}

GenerateGame();