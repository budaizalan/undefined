import Debug from "./Debug.js";
import Factory from "./Factory.js";
import Game from "./Game.js";
import Hex from "./Hex.js";
import HexMath from "./HexMath.js";
import UI from "./UI.js";

const bgCanvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const bgCtx = bgCanvas.getContext('2d');
const gameCtx = gameCanvas.getContext('2d');
bgCanvas.width = gameCanvas.width = window.innerWidth;
bgCanvas.height = gameCanvas.height = window.innerHeight;

const stoneImage = new Image();
const grassImage = new Image();
const grassImage2 = new Image();
const oceanImage = new Image();

grassImage.src = './assets/grass.png';
grassImage2.src = './assets/grass2.png';
stoneImage.src = './assets/stone.png';
oceanImage.src = './assets/ocean.png';

if (!gameCtx) {
    throw new Error('Failed to get 2D context');
}

Debug.initialize(gameCanvas, gameCtx, drawMap);
UI.initialize(gameCanvas, gameCtx);

function drawHex(x: number, y: number, terrainImage: HTMLImageElement): void {
    const corners = HexMath.calculateHexCorners(x, y);
    if (gameCtx) {
        const gradient = gameCtx.createRadialGradient(x, y, HexMath.hexSize / 4, x, y, HexMath.hexSize);
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(0.8, '#cccccc');
        gradient.addColorStop(1, '#888888');
        gameCtx.beginPath();
        gameCtx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            gameCtx.lineTo(corners[i].x, corners[i].y);
        }
        gameCtx.closePath();
        gameCtx.strokeStyle = '#000';
        gameCtx.lineWidth = 2;
        gameCtx.stroke();
        gameCtx.fillStyle = gradient;
        gameCtx.fill();
        gameCtx.drawImage(terrainImage, x - HexMath.hexWidth / 2, y - HexMath.hexHeight / 2, HexMath.hexWidth, HexMath.hexHeight);
    }
}

function drawBackground(): void {
    const columns = Math.floor((window.innerWidth / 2 + HexMath.hexSize) / (HexMath.hexWidth * 0.75));
    const rows = Math.ceil(columns / 2) + (Math.round((window.innerHeight / 2 + HexMath.hexSize) / (HexMath.hexHeight)));
    for (let q = -columns; q <= columns; q++) {
        for (let r = -rows; r <= rows; r++) {
            const { x, y } = HexMath.hexToPixel(q, r);
            if(x >= -window.innerWidth / 2 - HexMath.hexWidth && x <= window.innerWidth / 2 + HexMath.hexWidth && y >= -window.innerHeight / 2 - HexMath.hexHeight && y <= window.innerHeight / 2 + HexMath.hexHeight) {
                drawHex(x + gameCanvas.width / 2, y + gameCanvas.height / 2, oceanImage);
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
    console.log(hex)
    if (hex) {
        if (gameCtx) {
            console.log(HexMath.hexWidth, HexMath.hexHeight);
            
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
        console.log(`Clicked on hex: q=${hex.q}, r=${hex.r}`);
        const range = 1;
        HexMath.calculateRange(hex, range).forEach((hexPosition) => {
            console.log(`Hex: q=${hexPosition.q}, r=${hexPosition.r}`);
            const hex = Game.hexMap.getHex(hexPosition.q, hexPosition.r);
            if (hex) {
                hex.setTerrain('stone', stoneImage);
            }
        });
        drawMap();
        drawCity(hex);
        // drawHex((hex.x + HexMath.calculateHexDiagonal()) + canvas.width / 2, hex.y + canvas.height / 2, true, false);
    } else {
        console.log('No hex found at this position.');
    }
});

gameCanvas.addEventListener('mousedown', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(let i = 0; i < UI.factories.length; i++){
        if(HexMath.isPointInHex(gameCtx, x, y, {x: UI.factories[i].x, y: UI.factories[i].y}, UI.factories[i].size)){
            Game.factoryTypesCount[UI.factories[i].factoryType]--;
            Game.draggingFactory = UI.factories[i];
            Game.draggingFactory.offset = {x: x - UI.factories[i].x, y: y - UI.factories[i].y};
            return;
        }
    }
});
gameCanvas.addEventListener('mousemove', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(Game.draggingFactory){
        Game.draggingFactory.x = x - Game.draggingFactory.offset.x;
        Game.draggingFactory.y = y - Game.draggingFactory.offset.y;
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
        Game.factoryTypesCount[Game.draggingFactory.factoryType]++;
        Game.draggingFactory = null;
    }
    UI.draw();
});

function refreshScreen() {
    if (gameCtx) {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        drawMap();
        UI.draw();
        if (Game.draggingFactory) {
            UI.drawFactory(Game.draggingFactory);
        }
    }
}

function startRefreshingScreen() {
    setInterval(refreshScreen, 1000 / 60); // Refresh screen 60 times per second
}

startRefreshingScreen();



function StartGame() {
    if (!imagesLoaded()) {
        setTimeout(StartGame, 100);
        return;
    }
    // drawBackground();
    drawMap();
    UI.draw();
}

function imagesLoaded(){
    return grassImage.complete
        && stoneImage.complete
        && oceanImage.complete
        && grassImage2.complete;
}

StartGame();

console.log('hexMap:', Game.hexMap);