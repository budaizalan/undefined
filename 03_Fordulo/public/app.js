"use strict";
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (!ctx) {
    throw new Error('Failed to get 2D context');
}
const hexSize = 40;
const hexHeight = Math.sqrt(3) * hexSize;
const hexWidth = 2 * hexSize;
const hexVerticalSpacing = hexHeight * 0.75; // spacing between hexagons
function hexToPixel(q, r) {
    const x = hexSize * (3 / 2 * q);
    const y = hexSize * (Math.sqrt(3) * (r + q / 2));
    return { x, y };
}
function drawHex(x, y) {
    const corners = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const cornerX = x + hexSize * Math.cos(angle);
        const cornerY = y + hexSize * Math.sin(angle);
        corners.push({ x: cornerX, y: cornerY });
    }
    if (ctx) {
        ctx.beginPath();
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
function drawHexGrid(mapRadius) {
    for (let q = -mapRadius; q <= mapRadius; q++) {
        for (let r = -mapRadius; r <= mapRadius; r++) {
            if (Math.abs(q + r) <= mapRadius) {
                const { x, y } = hexToPixel(q, r);
                drawHex(x + canvas.width / 2, y + canvas.height / 2);
            }
        }
    }
}
drawHexGrid(5);
