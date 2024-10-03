import Cell from "./Cell.js";

export default class Game {
    private _map = new Array<Array<Cell>>();
    private _mapSize: number;
    private _score: number;
    private _moves: number;
    private _gameOver: boolean;

    get map() {
        return this._map;
    }

    get mapSize() {
        return this._mapSize;
    }

    get score() {
        return this._score;
    }

    get moves() {
        return this._moves;
    }

    get gameOver() {
        return this._gameOver;
    }

    constructor(mapSize: number) {
        this._mapSize = mapSize;
        this._score = 0;
        this._moves = 0;
        this._gameOver = false;
        this._map = this.generateMap();
    }

    private generateMap(): Array<Array<Cell>> {
        let map = new Array<Array<Cell>>();
        for (let i = 0; i < this._mapSize; i++) {
            map[i] = new Array<Cell>();
            for (let j = 0; j < this._mapSize; j++) {
                map[i][j] = new Cell(i, j, Math.floor(Math.random() * 11), 'none', null);
            }
        }
        return map;
    }
}