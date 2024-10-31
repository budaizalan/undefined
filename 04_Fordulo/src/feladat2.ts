const mapWidth = document.getElementById("map-width") as HTMLInputElement;
const mapHeight = document.getElementById("map-height") as HTMLInputElement;
const mapDescription = document.getElementById("map-description") as HTMLInputElement;
const mapGenerateButton = document.getElementById("map-generate") as HTMLButtonElement;
const map = document.getElementById("map") as HTMLDivElement;

mapGenerateButton.addEventListener("click", () => {
    const width = parseInt(mapWidth.value);
    const height = parseInt(mapHeight.value);
    const description = mapDescription.value.split("").filter((c: string) => c !== " " && c !== "\n");

    map.innerHTML = "";
    map.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    map.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if(description[i] === "1") {
            cell.style.backgroundColor = "black";
        } else if (description[i] === "0") {
            cell.style.backgroundColor = "white";
        }
        cell.style.width = `${50 / width}vw`;
        cell.style.height = `${50 / height}vh`;
        map.appendChild(cell);
    }
});