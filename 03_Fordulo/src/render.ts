import Debug from "./Debug.js";
import Game from "./Game.js";
import Hex from "./Hex.js";
import HexMath from "./HexMath.js";

const bgCanvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
const bgCtx = bgCanvas.getContext('2d');
const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
bgCanvas.width = canvas.width = window.innerWidth;
bgCanvas.height = canvas.height = window.innerHeight;

const stoneImage = new Image();
const grassImage = new Image();
const grassImage2 = new Image();
const oceanImage = new Image();

grassImage.src = './assets/grass.png';
grassImage2.src = './assets/grass2.png';
stoneImage.src = './assets/stone.png';
oceanImage.src = './assets/ocean.png';

if (!ctx) {
    throw new Error('Failed to get 2D context');
}

Debug.initialize(canvas, ctx, drawMap);

function drawHex(x: number, y: number, terrainImage: HTMLImageElement): void {
    const corners = HexMath.calculateHexCorners(x, y);
    if (ctx) {
        const gradient = ctx.createRadialGradient(x, y, HexMath.hexSize / 4, x, y, HexMath.hexSize);
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(0.8, '#cccccc');
        gradient.addColorStop(1, '#888888');
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.drawImage(terrainImage, x - HexMath.hexWidth / 2, y - HexMath.hexHeight / 2, HexMath.hexWidth, HexMath.hexHeight);
    }
}

function drawBackground(): void {
    const columns = Math.floor((window.innerWidth / 2 + HexMath.hexSize) / (HexMath.hexWidth * 0.75));
    const rows = Math.ceil(columns / 2) + (Math.round((window.innerHeight / 2 + HexMath.hexSize) / (HexMath.hexHeight)));
    for (let q = -columns; q <= columns; q++) {
        for (let r = -rows; r <= rows; r++) {
            const { x, y } = HexMath.hexToPixel(q, r);
            if(x >= -window.innerWidth / 2 - HexMath.hexWidth && x <= window.innerWidth / 2 + HexMath.hexWidth && y >= -window.innerHeight / 2 - HexMath.hexHeight && y <= window.innerHeight / 2 + HexMath.hexHeight) {
                drawHex(x + canvas.width / 2, y + canvas.height / 2, oceanImage);
            }
        }
    }
}

function drawMap(): void {
    const hexes = Game.hexMap.getAllHexes(); 
    for (const hex of hexes) {
        drawHex(hex.x + canvas.width / 2, hex.y + canvas.height / 2, hex.terrainImage);
        Debug.drawCoords(hex.x, hex.y, hex.q, hex.r);
    }
}

function drawCity(hex: Hex): void {
    console.log(hex)
    if (hex) {
        if (ctx) {
            console.log(HexMath.hexWidth, HexMath.hexHeight);
            
            // ctx.drawImage(cityImage, hex.x - (HexMath.hexWidth) + canvas.width / 2, hex.y - (HexMath.hexHeight + 15) + canvas.height / 2, HexMath.hexWidth * 2, HexMath.hexHeight * 2);
        }
    }
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - canvas.width / 2;
    const y = event.clientY - rect.top - canvas.height / 2;
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

function StartGame() {
    if (!imagesLoaded()) {
        setTimeout(StartGame, 100);
        return;
    }
    // drawBackground();
    drawMap();
}

function imagesLoaded(){
    console.log('grassImage:', grassImage.complete);
    console.log('stoneImage:', stoneImage.complete);
    console.log('oceanImage:', oceanImage.complete);
    return grassImage.complete && stoneImage.complete && oceanImage.complete && grassImage2.complete;
}

StartGame();

console.log('hexMap:', Game.hexMap);