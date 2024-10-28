import Debug from "./Debug.js";
import Game from "./Game.js";
import Hex from "./Hex.js";
import HexMath from "./HexMath.js";
import Images from "./Images.js";
import City from "./Structures.js";
import UI from "./UI.js";

const bgCanvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const bgCtx = bgCanvas.getContext('2d');
const gameCtx = gameCanvas.getContext('2d');
bgCanvas.width = gameCanvas.width = window.innerWidth;
bgCanvas.height = gameCanvas.height = window.innerHeight;

const images = new Images();

// const stoneImage = new Image();
// const grassImage = new Image();
// const grassImage2 = new Image();
// const oceanImage = new Image();

// grassImage.src = './assets/grass.png';
// grassImage2.src = './assets/grass2.png';
// stoneImage.src = './assets/stone.png';
// oceanImage.src = './assets/ocean.png';

if (!gameCtx || !bgCtx) {
    throw new Error('Failed to get 2D context');
}

Debug.initialize(bgCanvas, bgCtx, drawMap);
UI.initialize(bgCanvas, bgCtx);

function drawHex(x: number, y: number, terrainImage: HTMLImageElement): void {
    const corners = HexMath.calculateHexCorners(x, y);
    if (bgCtx) {
        const gradient = bgCtx.createRadialGradient(x, y, HexMath.hexSize / 4, x, y, HexMath.hexSize);
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(0.8, '#cccccc');
        gradient.addColorStop(1, '#888888');
        bgCtx.beginPath();
        bgCtx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            bgCtx.lineTo(corners[i].x, corners[i].y);
        }
        bgCtx.closePath();
        bgCtx.strokeStyle = '#000';
        bgCtx.lineWidth = 2;
        bgCtx.stroke();
        bgCtx.fillStyle = gradient;
        bgCtx.fill();
        bgCtx.drawImage(terrainImage, x - HexMath.hexWidth / 2, y - HexMath.hexHeight / 2, HexMath.hexWidth, HexMath.hexHeight);
    }
}

function drawBackground(): void {
    const columns = Math.floor((window.innerWidth / 2 + HexMath.hexSize) / (HexMath.hexWidth * 0.75));
    const rows = Math.ceil(columns / 2) + (Math.round((window.innerHeight / 2 + HexMath.hexSize) / (HexMath.hexHeight)));
    for (let q = -columns; q <= columns; q++) {
        for (let r = -rows; r <= rows; r++) {
            const { x, y } = HexMath.hexToPixel(q, r);
            if(x >= -window.innerWidth / 2 - HexMath.hexWidth && x <= window.innerWidth / 2 + HexMath.hexWidth && y >= -window.innerHeight / 2 - HexMath.hexHeight && y <= window.innerHeight / 2 + HexMath.hexHeight) {
                drawHex(x + gameCanvas.width / 2, y + gameCanvas.height / 2, images.oceanImage);
            }
        }
    }
}

function drawMap(): void {
    const hexes = Game.hexMap.getAllHexes(); 
    for (const hex of hexes) {
        drawHex(hex.x + gameCanvas.width / 2, hex.y + gameCanvas.height / 2, hex.terrainImage);
        Debug.drawCoords(hex.x, hex.y, hex.q, hex.r);
    }
}

function drawCity(hex: Hex): void {
    if (hex) {
        if (gameCtx) {
            // ctx.drawImage(cityImage, hex.x - (HexMath.hexWidth) + canvas.width / 2, hex.y - (HexMath.hexHeight + 15) + canvas.height / 2, HexMath.hexWidth * 2, HexMath.hexHeight * 2);
        }
    }
}

gameCanvas.addEventListener('click', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left - gameCanvas.width / 2;
    const y = event.clientY - rect.top - gameCanvas.height / 2;
    const { q, r } = HexMath.pixelToHex(x, y);
    const hex = Game.hexMap.getHex(q, r);
    if (hex) {
        // console.log(`Clicked on hex: q=${hex.q}, r=${hex.r}`);
        const range = 1;
        HexMath.calculateRange(hex, range).forEach((hexPosition) => {
            console.log(`Hex: q=${hexPosition.q}, r=${hexPosition.r}`);            
            // const hex = Game.hexMap.getHex(hexPosition.q, hexPosition.r);
            // console.log(hex);
            // if (hex) {
            //     hex.setTerrain('stone', images.stoneImage);
            // }
        });
        drawMap();
        // drawCity(hex);
        // drawHex((hex.x + HexMath.calculateHexDiagonal()) + canvas.width / 2, hex.y + canvas.height / 2, true, false);
    } else {
        console.log('No hex found at this position.');
    }
});

// gameCanvas.addEventListener('contextmenu', (event) => {
//     const rect = gameCanvas.getBoundingClientRect();
//     const x = event.clientX - rect.left - gameCanvas.width / 2;
//     const y = event.clientY - rect.top - gameCanvas.height / 2;
//     const { q, r } = HexMath.pixelToHex(x, y);
//     const hex = Game.hexMap.getHex(q, r);
//     if (hex && hex.terrain != "stone" && hex.terrain != "ocean") {
//         console.log(`Clicked on hex: q=${hex.q}, r=${hex.r}`);
//         Game.setFactory(hex);
//         Game.checkIntersection();
//         drawMap();
//         Game.checkEndGame();
//         console.log(Game.cities); 
//     } else {
//         console.log('Cannot place there.');
//     }
// });

gameCanvas.addEventListener('mousedown', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(let i = 0; i < UI.factories.length; i++){
        if(HexMath.isPointInHex(gameCtx, x, y, {x: UI.factories[i].x, y: UI.factories[i].y}, UI.factories[i].size)){
            Game.factoryTypesCount[UI.factories[i].productionType]--;
            Game.draggingFactory = UI.factories[i];
            Game.draggingFactory.x = x;
            Game.draggingFactory.y = y;
            UI.draw();
            return;
        }
    }
});
gameCanvas.addEventListener('mousemove', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(Game.draggingFactory){
        Game.draggingFactory.x = x;
        Game.draggingFactory.y = y;
    } else {
        for(let i = 0; i < UI.factories.length; i++){
            if(HexMath.isPointInHex(gameCtx, x, y, {x: UI.factories[i].x, y: UI.factories[i].y}, UI.factories[i].size)){
                gameCanvas.style.cursor = 'pointer';
                return;
            }
        }
        gameCanvas.style.cursor = 'default';
    }
});
gameCanvas.addEventListener('mouseup', (event) => {
    if (Game.draggingFactory) {
        Game.factoryTypesCount[Game.draggingFactory.productionType]++;
        const rect = gameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left - gameCanvas.width / 2;
        const y = event.clientY - rect.top - gameCanvas.height / 2;
        const { q, r } = HexMath.pixelToHex(x, y);
        const hex = Game.hexMap.getHex(q, r);
        if (hex && hex.terrain != "stone" && hex.terrain != "ocean") {
            console.log(`Clicked on hex: q=${hex.q}, r=${hex.r}`);
            Game.setFactory(hex);
            Game.checkIntersection();
            drawMap();
            Game.checkEndGame();
            console.log(Game.cities); 
        } else {
            console.log('Cannot place there.');
        }
        Game.draggingFactory = null;
    }
    UI.draw();
});

function draw(): void {
    if (gameCtx) {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(bgCanvas, 0, 0);
        if (Game.draggingFactory) {
            UI.drawFactory(gameCtx, Game.draggingFactory);
        }
    }
    requestAnimationFrame(draw);
}

function StartGame() {
    if (!imagesLoaded()) {
        setTimeout(StartGame, 100);
        return;
    }
    // drawBackground();
    Game.setObjective(0);
    drawMap();
    UI.draw();
    draw();
}

function imagesLoaded(){
    return images.grassImage.complete
        && images.stoneImage.complete
        && images.oceanImage.complete
        && images.grassImage2.complete;
}

StartGame();

console.log('hexMap:', Game.hexMap);