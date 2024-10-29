import Debug from "./utilities/Debug.js";
import Game from "./models/Game.js";
import HexMath from "./utilities/HexMath.js";
import Images from "./models/Images.js";
import UI from "./UI.js";
const bgCanvas = document.getElementById('backgroundCanvas');
const gameCanvas = document.getElementById('gameCanvas');
const bgCtx = bgCanvas.getContext('2d');
const gameCtx = gameCanvas.getContext('2d');
bgCanvas.width = gameCanvas.width = window.innerWidth;
bgCanvas.height = gameCanvas.height = window.innerHeight;
if (!gameCtx || !bgCtx) {
    throw new Error('Failed to get 2D context');
}
Debug.initialize(bgCanvas, bgCtx, drawMap);
UI.initialize(bgCanvas, bgCtx);
Images.initialize();
function drawHex(x, y, terrainImage, terrain) {
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
        // bgCtx.strokeStyle = '#000';
        // bgCtx.lineWidth = 0;
        // bgCtx.stroke();
        // bgCtx.fillStyle = gradient;
        // bgCtx.fill();
        if (terrain === 'city') {
            bgCtx.drawImage(terrainImage, x - (HexMath.hexSize * 2.5), y - (HexMath.hexHeight * 1.5), (HexMath.hexWidth * 2.5), (HexMath.hexHeight * 3));
        }
        else {
            bgCtx.drawImage(terrainImage, x - HexMath.hexWidth / 2, y - HexMath.hexHeight / 2, HexMath.hexWidth, HexMath.hexHeight);
        }
    }
}
function drawBackground() {
    const columns = Math.floor((window.innerWidth / 2 + HexMath.hexSize) / (HexMath.hexWidth * 0.75));
    const rows = Math.ceil(columns / 2) + (Math.round((window.innerHeight / 2 + HexMath.hexSize) / (HexMath.hexHeight)));
    for (let q = -columns; q <= columns; q++) {
        for (let r = -rows; r <= rows; r++) {
            const { x, y } = HexMath.hexToPixel(q, r);
            if (x >= -window.innerWidth / 2 - HexMath.hexWidth && x <= window.innerWidth / 2 + HexMath.hexWidth && y >= -window.innerHeight / 2 - HexMath.hexHeight && y <= window.innerHeight / 2 + HexMath.hexHeight) {
                drawHex(x + gameCanvas.width / 2, y + gameCanvas.height / 2, Images.oceanImage);
            }
        }
    }
}
function drawMap() {
    const hexes = Game.hexMap.getAllHexes();
    const cities = [];
    const factories = [];
    for (const hex of hexes) {
        if (hex.type === 'city') {
            if (hex.terrain === 'city') {
                cities.push(hex);
            }
        }
        else if (hex.type === 'factory') {
            factories.push(hex);
        }
        else {
            drawHex(hex.x + gameCanvas.width / 2, hex.y + gameCanvas.height / 2, hex.terrainImage, hex.terrain);
        }
        Debug.drawCoords(hex.x, hex.y, hex.q, hex.r);
    }
    for (const factory of factories) {
        drawRange(factory);
        drawHex(factory.x + gameCanvas.width / 2, factory.y + gameCanvas.height / 2, factory.terrainImage, factory.terrain);
    }
    for (const city of cities) {
        let city1;
        Game.cities.map(c => {
            if (c.position.q == city.q && c.position.r == city.r)
                city1 = c;
        });
        drawCity(city.x + gameCanvas.width / 2, city.y + gameCanvas.height / 2, city.terrainImage, city.terrain, city1?.isSupplied, city1?.requirements[0]);
    }
}
function drawCity(x, y, image, terrainType, isSupplied, type) {
    drawHex(x, y, image, terrainType);
    if (!isSupplied) {
        bgCtx?.drawImage(Images.msgBubbleImage, x - HexMath.hexSize / 3, y - HexMath.hexSize * 3, HexMath.hexSize * 2, HexMath.hexSize * 2);
        bgCtx?.drawImage(Images.getBatteryImage(type), x + HexMath.hexSize * .25, y - HexMath.hexSize * 2.6, HexMath.hexSize, HexMath.hexSize);
    }
}
function drawRange(hex) {
    HexMath.calculateRange({ q: hex.q, r: hex.r }, 2).forEach(hexPosition => {
        const hex = Game.hexMap.getHex(hexPosition.q, hexPosition.r);
        if (hex) {
            if (bgCtx) {
                const hexCorners = HexMath.calculateHexCorners(hex.x + bgCanvas.width / 2, hex.y + bgCanvas.height / 2);
                bgCtx.beginPath();
                bgCtx.moveTo(hexCorners[0].x, hexCorners[0].y);
                for (let i = 1; i < 6; i++) {
                    bgCtx.lineTo(hexCorners[i].x, hexCorners[i].y);
                }
                bgCtx.closePath();
                bgCtx.fillStyle = 'rgba(0, 0, 255, 0.2)';
                bgCtx.fill();
            }
        }
    });
}
function setupEventListeners() {
    gameCanvas.addEventListener('mousedown', (event) => {
        const rect = gameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (let i = 0; i < UI.factories.length; i++) {
            if (HexMath.isPointInHex(gameCtx, x, y, { x: UI.factories[i].x, y: UI.factories[i].y }, UI.factories[i].size)) {
                if (Game.factoryTypesCount[UI.factories[i].productionType] > 0) {
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
        if (Game.draggingFactory) {
            const { q, r } = HexMath.pixelToHex(x - gameCanvas.width / 2, y - gameCanvas.height / 2);
            const hex = Game.hexMap.getHex(q, r);
            if (hex) {
                if ((hex.type != 'city') && (hex.type != 'factory')) {
                    if (hex.q != Game.draggingFactory.position?.q || hex.r != Game.draggingFactory.position?.r) {
                        Game.draggingFactory.onMap = true;
                        Game.draggingFactory.size = HexMath.hexSize;
                        Game.draggingFactory.setPosition({ q, r });
                        Game.draggingFactory.x = hex.x + gameCanvas.width / 2;
                        Game.draggingFactory.y = hex.y + gameCanvas.height / 2;
                        drawBgCanvas(Game.draggingFactory);
                    }
                }
                else {
                    if (Game.draggingFactory.onMap) {
                        drawBgCanvas();
                    }
                    Game.draggingFactory.onMap = false;
                    Game.draggingFactory.setPosition(undefined);
                    Game.draggingFactory.x = x;
                    Game.draggingFactory.y = y;
                }
            }
            else {
                if (Game.draggingFactory.onMap) {
                    drawBgCanvas();
                }
                Game.draggingFactory.onMap = false;
                Game.draggingFactory.size = 50;
                Game.draggingFactory.setPosition(undefined);
                Game.draggingFactory.x = x;
                Game.draggingFactory.y = y;
            }
        }
        else {
            for (let i = 0; i < UI.factories.length; i++) {
                if (HexMath.isPointInHex(gameCtx, x, y, { x: UI.factories[i].x, y: UI.factories[i].y }, UI.factories[i].size) && Game.factoryTypesCount[UI.factories[i].productionType] > 0) {
                    gameCanvas.style.cursor = 'pointer';
                    return;
                }
            }
            gameCanvas.style.cursor = 'default';
        }
    });
    gameCanvas.addEventListener('mouseup', (event) => {
        const rect = gameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        gameCanvas.style.cursor = 'default';
        if (Game.draggingFactory) {
            const { q, r } = HexMath.pixelToHex(x - gameCanvas.width / 2, y - gameCanvas.height / 2);
            const hex = Game.hexMap.getHex(q, r);
            Game.factoryTypesCount[Game.draggingFactory.productionType]++;
            if (hex) {
                if ((hex.type != 'city' && hex.type != 'factory')) {
                    placeFactory(event, Game.draggingFactory);
                }
            }
            Game.draggingFactory = null;
        }
        drawBgCanvas();
        UI.draw();
    });
}
function placeFactory(event, factory) {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left - gameCanvas.width / 2;
    const y = event.clientY - rect.top - gameCanvas.height / 2;
    const { q, r } = HexMath.pixelToHex(x, y);
    const hex = Game.hexMap.getHex(q, r);
    if (hex) {
        Game.setFactory(hex, factory);
        Game.checkIntersection();
        drawMap();
        Game.checkEndGame();
    }
}
function draw() {
    if (gameCtx) {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(bgCanvas, 0, 0);
        if (Game.draggingFactory && !Game.draggingFactory.onMap) {
            UI.drawFactory(gameCtx, Game.draggingFactory);
        }
    }
    requestAnimationFrame(draw);
}
function drawBgCanvas(draggingFactory) {
    if (bgCtx) {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        drawMap();
        UI.draw();
        if (draggingFactory) {
            UI.drawFactory(bgCtx, draggingFactory);
        }
    }
}
export function StartGame(level) {
    resetGame();
    Game.generateLevel(level);
    if (!Images.imagesLoaded()) {
        setTimeout(StartGame, 100);
        return;
    }
    setupEventListeners();
    // drawBackground();
    drawBgCanvas();
    draw();
}
function resetGame() {
}
console.log('hexMap:', Game.hexMap);
