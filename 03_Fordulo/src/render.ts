import Game from "./Game.js";
import Hex from "./HexMath.js";

const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (!ctx) {
    throw new Error('Failed to get 2D context');
}

function drawHex(x: number, y: number): void {
    const corners = Hex.calculateHexCorners(x, y);
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = '#f0f0f0';
        ctx.fill();
    }
}

function drawMap(): void {
    const hexes = Game.hexMap.getAllHexes();
    for (const hex of hexes) {
        drawHex(hex.x + canvas.width / 2, hex.y + canvas.height / 2);
    }
}

drawMap();
console.log('hexMap:', Game.hexMap);