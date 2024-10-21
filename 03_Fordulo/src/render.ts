import Debug from "./Debug.js";
import Game from "./Game.js";
import HexMath from "./HexMath.js";

const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (!ctx) {
    throw new Error('Failed to get 2D context');
}

Debug.initialize(canvas, ctx, drawMap);

function drawHex(x: number, y: number): void {
    const corners = HexMath.calculateHexCorners(x, y);
    if (ctx) {
        const gradient = ctx.createRadialGradient(x, y, HexMath.hexSize / 2, x, y, HexMath.hexSize);
        gradient.addColorStop(0.4, '#f0f0f0');
        gradient.addColorStop(1, '#cccccc');
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

function drawMap(): void {
    const hexes = Game.hexMap.getAllHexes();
    for (const hex of hexes) {
        drawHex(hex.x + canvas.width / 2, hex.y + canvas.height / 2);
        Debug.drawCoords(hex.x, hex.y, hex.q, hex.r);
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
    } else {
        console.log('No hex found at this position.');
    }
});

drawMap();
console.log('hexMap:', Game.hexMap);