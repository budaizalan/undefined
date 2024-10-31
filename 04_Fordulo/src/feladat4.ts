export class Player{
    private _number: number;
    private _color: string;
    private _score: number;

    set number(number: number){
        this._number = number;
    }

    get number(): number{
        return this._number;
    }

    set color(color: string){
        this._color = color;
    }

    get color(): string{
        return this._color;
    }

    set score(score: number){
        this._score = score;
    }

    get score(): number{
        return this._score;
    }

    constructor(color: string, number: number){
        this._number = number;
        this._color = color;
        this._score = 0;
    }
}

export class Dot{
    private _position: {q: number, r: number};
    private _coords: {x: number, y: number};
    private _color: string = 'white';

    set color(color: string){
        this._color = color;
    }

    get color(): string{
        return this._color;
    }

    constructor(q: number, r: number, x: number, y: number){
        this._position = {q, r};
        this._coords = {x, y};
    }

    getPosition(): {q: number, r: number}{
        return this._position;
    }

    getCoords(): {x: number, y: number}{
        return this._coords;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.arc(this._coords.x, this._coords.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }
}

export abstract class Game{
    private static _size: number;
    private static _map: Dot[][];
    private static _lines: {start: Dot, end: Dot, player: number}[] = [];
    private static _currentLine: {start: Dot | null, end: Dot | null} = {start: null, end: null};
    private static _currentPlayer: Player;

    static get size(): number{
        return this._size;
    }

    static set map(map: Dot[][]){
        this._map = map;
    }

    static get map(): Dot[][]{
        return this._map;
    }

    static set lines(lines: {start: Dot, end: Dot, player: number}[]){
        this._lines = lines;
    }

    static get lines(): {start: Dot, end: Dot, player: number}[]{
        return this._lines;
    }

    static set currentLine(line: {start: Dot | null, end: Dot | null}){
        this._currentLine = line;
    }

    static get currentLine(): {start: Dot | null, end: Dot | null}{
        return this._currentLine;
    }

    static set currentPlayer(player: Player){
        this._currentPlayer = player;
    }

    static get currentPlayer(): Player{
        return this._currentPlayer;
    }

    static generateMap(size: number, canvasWidth: number){
        Game._size = size;
        Game._map = [];
        for(let i = 0; i < size; i++){
            Game._map.push([]);
            for(let j = 0; j < size; j++){
                const x = (canvasWidth / (size - 1)) * j + 10;
                const y = (canvasWidth / (size - 1)) * i + 10;
                Game._map[i].push(new Dot(j, i, x, y));
            }
        }
    }

    static draw(ctx: CanvasRenderingContext2D){
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(let i = 0; i < Game._size; i++){
            for(let j = 0; j < Game._size; j++){
                Game._map[i][j].draw(ctx);
            }
        }
        this.drawLines(ctx);
    }

    static drawLines(ctx: CanvasRenderingContext2D){
        for(let i = 0; i < Game._lines.length; i++){
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



const gameCanvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d');
const mapSize = document.getElementById('map-size') as HTMLInputElement;
const generateButton = document.getElementById('map-generate') as HTMLButtonElement;
const player1Color = document.getElementById('player1-color') as HTMLInputElement;
const player2Color = document.getElementById('player2-color') as HTMLInputElement;
let player1: Player;
let player2: Player;
gameCanvas.width = 600;
gameCanvas.height = 600;

generateButton.addEventListener('click', () => {
    player1Color.disabled = true;
    player2Color.disabled = true;
    Game.generateMap(parseInt(mapSize.value), gameCanvas.width - 20);
    player1 = new Player(player1Color.value, 1);
    player2 = new Player(player2Color.value, 2);
    Game.currentPlayer = player1;
    if(ctx){
        Game.draw(ctx);
    }
});

gameCanvas.addEventListener('click', (event) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(let i = 0; i < Game.size; i++){
        for(let j = 0; j < Game.size; j++){
            const dot = Game.map[i][j];
            const dx = x - dot.getCoords().x;
            const dy = y - dot.getCoords().y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < 10){
                console.log(`Dot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                console.log(`currentline: ${Game.currentLine.start}, ${Game.currentLine.end}`);
                if(Game.currentLine.start === null){
                    dot.color = Game.currentPlayer.color;
                    if(ctx){
                        Game.draw(ctx);
                    }
                    Game.currentLine.start = dot;
                    console.log(`startDot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                } else if(Game.currentLine.end === null && Game.currentLine.start !== dot && Game.lines.every(line => line.start !== dot && line.end !== dot)
                    && ((Game.currentLine.start.getPosition().q === dot.getPosition().q && Math.abs(Game.currentLine.start.getPosition().r - dot.getPosition().r) === 1)
                    || (Game.currentLine.start.getPosition().r === dot.getPosition().r && Math.abs(Game.currentLine.start.getPosition().q - dot.getPosition().q) === 1))){
                    dot.color = Game.currentPlayer.color;
                    Game.currentLine.end = dot;
                    console.log(`endDot: ${dot.getPosition().q}, ${dot.getPosition().r}`);
                    Game.lines.push({start: Game.currentLine.start, end: Game.currentLine.end, player: Game.currentPlayer.number});
                    console.log(Game.lines);
                    Game.currentLine = {start: null, end: null};
                    Game.currentPlayer = Game.currentPlayer === player1 ? player2 : player1;
                    if(ctx){
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
    for(let i = 0; i < Game.size; i++){
        for(let j = 0; j < Game.size; j++){
            const dot = Game.map[i][j];
            const dx = x - dot.getCoords().x;
            const dy = y - dot.getCoords().y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < 10){
                if(Game.currentLine.end === null && Game.currentLine.start !== dot){
                    onDot = true;
                }
                break;
            }
        }
        if(onDot){
            gameCanvas.style.cursor = 'pointer';
            break;
        } else {
            gameCanvas.style.cursor = 'default';
        }
    }
});