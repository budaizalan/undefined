import Debug from "./utilities/Debug.js";
import Factory from "./models/Factory.js";
import Game from "./models/Game.js";
import Hex from "./models/Hex.js";
import HexMath from "./utilities/HexMath.js";
import Images from "./models/Images.js";
import UI from "./UI.js";

const bgCanvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const bgCtx = bgCanvas.getContext('2d');
const gameCtx = gameCanvas.getContext('2d');
const images = new Images();
bgCanvas.width = gameCanvas.width = window.innerWidth;
bgCanvas.height = gameCanvas.height = window.innerHeight;
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

gameCanvas.addEventListener('mousedown', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(let i = 0; i < UI.factories.length; i++){
        if(HexMath.isPointInHex(gameCtx, x, y, {x: UI.factories[i].x, y: UI.factories[i].y}, UI.factories[i].size)){
            if(Game.factoryTypesCount[UI.factories[i].productionType] > 0){
                gameCanvas.style.cursor = 'grabbing';
                Game.factoryTypesCount[UI.factories[i].productionType]--;
                Game.draggingFactory = UI.factories[i];
                Game.draggingFactory.x = x;
                Game.draggingFactory.y = y;
                UI.draw();
                return;
            }            
        }
    }
});
gameCanvas.addEventListener('mousemove', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(Game.draggingFactory){
        const {q , r} = HexMath.pixelToHex(x - gameCanvas.width / 2, y - gameCanvas.height / 2);
        const hex = Game.hexMap.getHex(q, r);
        if(hex){
            if(hex.q != Game.draggingFactory.position?.q || hex.r != Game.draggingFactory.position?.r){
                Game.draggingFactory.onMap = true;
                Game.draggingFactory.size = HexMath.hexSize;
                Game.draggingFactory.setPosition({q, r});
                Game.draggingFactory.x = hex.x + gameCanvas.width / 2;
                Game.draggingFactory.y = hex.y + gameCanvas.height / 2;
                drawBgCanvas(Game.draggingFactory);
            }
        } else {
            if(Game.draggingFactory.onMap){ 
                drawBgCanvas(); // refresh background Canvas so the factory doesn't stay on the map
            }
            Game.draggingFactory.onMap = false;
            Game.draggingFactory.size = 50;
            Game.draggingFactory.setPosition(undefined);
            Game.draggingFactory.x = x;
            Game.draggingFactory.y = y;
        }
    } else {
        for(let i = 0; i < UI.factories.length; i++){
            if(HexMath.isPointInHex(gameCtx, x, y, {x: UI.factories[i].x, y: UI.factories[i].y}, UI.factories[i].size) && Game.factoryTypesCount[UI.factories[i].productionType] > 0){
                gameCanvas.style.cursor = 'pointer';
                return;
            }
        }
        gameCanvas.style.cursor = 'default';
    }
});
gameCanvas.addEventListener('mouseup', (event) => {
    gameCanvas.style.cursor = 'default';
    if (Game.draggingFactory) {
        Game.factoryTypesCount[Game.draggingFactory.productionType]++;
        placeFactory(event);
        Game.draggingFactory = null;
    }
    UI.draw();
});

function placeFactory(event: any): void{
    const rect = gameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left - gameCanvas.width / 2;
        const y = event.clientY - rect.top - gameCanvas.height / 2;
        const { q, r } = HexMath.pixelToHex(x, y);
        const hex = Game.hexMap.getHex(q, r);
        if (hex && hex.terrain != "stone" && hex.terrain != "ocean") {
            Game.setFactory(hex);
            Game.checkIntersection();
            drawMap();
            Game.checkEndGame();
        } else {
            console.log('Cannot place there.');
        }
}

function draw(): void {
    if (gameCtx) {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(bgCanvas, 0, 0);
        if (Game.draggingFactory && !Game.draggingFactory.onMap) {
            UI.drawFactory(gameCtx, Game.draggingFactory);
        }
    }
    requestAnimationFrame(draw);
}

function drawBgCanvas(draggingFactory?: Factory): void {
    if(bgCtx){
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        drawMap();
        UI.draw();
        if(draggingFactory){
            UI.drawFactory(bgCtx, draggingFactory);
        }
    }
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