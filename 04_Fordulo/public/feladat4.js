export class Player {
    _number;
    _color;
    _score;
    set number(number) {
        this._number = number;
    }
    get number() {
        return this._number;
    }
    set color(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    set score(score) {
        this._score = score;
    }
    get score() {
        return this._score;
    }
    constructor(color, number) {
        this._number = number;
        this._color = color;
        this._score = 0;
    }
}
export class Dot {
    _position;
    _coords;
    _color = 'white';
    set color(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    constructor(q, r, x, y) {
        this._position = { q, r };
        this._coords = { x, y };
    }
    getPosition() {
        return this._position;
    }
    getCoords() {
        return this._coords;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this._coords.x, this._coords.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }
}
export class Game {
    static _size;
    static _map;
    static _lines = [];
    static _currentLine = { start: null, end: null };
    static _currentPlayer;
    static get size() {
        return this._size;
    }
    static set map(map) {
        this._map = map;
    }
    static get map() {
        return this._map;
    }
    static set lines(lines) {
        this._lines = lines;
    }
    static get lines() {
        return this._lines;
    }
    static set currentLine(line) {
        this._currentLine = line;
    }
    static get currentLine() {
        return this._currentLine;
    }
    static set currentPlayer(player) {
        this._currentPlayer = player;
    }
    static get currentPlayer() {
        return this._currentPlayer;
    }
    static generateMap(size, canvasWidth) {
        Game._size = size;
        Game._map = [];
        for (let i = 0; i < size; i++) {
            Game._map.push([]);
            for (let j = 0; j < size; j++) {
                const x = (canvasWidth / (size - 1)) * j + 10;
                const y = (canvasWidth / (size - 1)) * i + 10;
                Game._map[i].push(new Dot(j, i, x, y));
            }
        }
    }
    static draw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < Game._size; i++) {
            for (let j = 0; j < Game._size; j++) {
                Game._map[i][j].draw(ctx);
            }
        }
        this.drawLines(ctx);
    }
    static drawLines(ctx) {
        for (let i = 0; i < Game._lines.length; i++) {
            ctx.beginPath();
            ctx.moveTo(Game._lines[i].start.getCoords().x, Game._lines[i].start.getCoords().y);
            ctx.lineTo(Game._lines[i].end.getCoords().x, Game._lines[i].end.getCoords().y);
            ctx.strokeStyle = Game._lines[i].player === 1 ? player1.color : player2.color;
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.closePath();
        }
    }
}
const gameCanvas = document.getElementById('game');
const ctx = gameCanvas.getContext('2d');
const mapSize = document.getElementById('map-size');
const generateButton = document.getElementById('map-generate');
const player1Color = document.getElementById('player1-color');
const player2Color = document.getElementById('player2-color');
let player1;
let player2;
gameCanvas.width = 600;
gameCanvas.height = 600;
generateButton.addEventListener('click', () => {
    player1Color.disabled = true;
    player2Color.disabled = true;
    Game.generateMap(parseInt(mapSize.value), gameCanvas.width - 20);
    player1 = new Player(player1Color.value, 1);
    player2 = new Player(player2Color.value, 2);
    Game.currentPlayer = player1;
    if (ctx) {
        Game.draw(ctx);
    }
});
gameCanvas.addEventListener('click', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < Game.size; i++) {
        for (let j = 0; j < Game.size; j++) {
            const dot = Game.map[i][j];
            const dx = x - dot.getCoords().x;
            const dy = y - dot.getCoords().y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
                console.log(`Dot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                console.log(`currentline: ${Game.currentLine.start}, ${Game.currentLine.end}`);
                if (Game.currentLine.start === null) {
                    dot.color = Game.currentPlayer.color;
                    if (ctx) {
                        Game.draw(ctx);
                    }
                    Game.currentLine.start = dot;
                    console.log(`startDot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                }
                else if (Game.currentLine.end === null && Game.currentLine.start !== dot && Game.lines.every(line => line.start !== dot && line.end !== dot)
                    && ((Game.currentLine.start.getPosition().q === dot.getPosition().q && Math.abs(Game.currentLine.start.getPosition().r - dot.getPosition().r) === 1)
                        || (Game.currentLine.start.getPosition().r === dot.getPosition().r && Math.abs(Game.currentLine.start.getPosition().q - dot.getPosition().q) === 1))) {
                    dot.color = Game.currentPlayer.color;
                    Game.currentLine.end = dot;
                    console.log(`endDot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                    Game.lines.push({ start: Game.currentLine.start, end: Game.currentLine.end, player: Game.currentPlayer.number });
                    console.log(Game.lines);
                    Game.currentLine = { start: null, end: null };
                    Game.currentPlayer = Game.currentPlayer === player1 ? player2 : player1;
                    if (ctx) {
                        Game.draw(ctx);
                    }
                }
            }
        }
    }
});
gameCanvas.addEventListener('mousemove', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let onDot = false;
    for (let i = 0; i < Game.size; i++) {
        for (let j = 0; j < Game.size; j++) {
            const dot = Game.map[i][j];
            const dx = x - dot.getCoords().x;
            const dy = y - dot.getCoords().y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
                if (Game.currentLine.end === null && Game.currentLine.start !== dot) {
                    onDot = true;
                }
                break;
            }
        }
        if (onDot) {
            gameCanvas.style.cursor = 'pointer';
            break;
        }
        else {
            gameCanvas.style.cursor = 'default';
        }
    }
});
