"use strict";
const mapWidth = document.getElementById("map-width");
const mapHeight = document.getElementById("map-height");
const mapDescription = document.getElementById("map-description");
const mapGenerateButton = document.getElementById("map-generate");
const map = document.getElementById("map");
mapGenerateButton.addEventListener("click", () => {
    const width = parseInt(mapWidth.value);
    const height = parseInt(mapHeight.value);
    const description = mapDescription.value.split("").filter((c) => c !== " " && c !== "\n");
    map.innerHTML = "";
    map.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    map.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (description[i] === "1") {
            cell.style.backgroundColor = "black";
        }
        else if (description[i] === "0") {
            cell.style.backgroundColor = "white";
        }
        cell.style.width = `${50 / width}vw`;
        cell.style.height = `${50 / height}vh`;
        map.appendChild(cell);
    }
});
