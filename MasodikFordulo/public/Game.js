import Cell, { ProtoCell } from "./Cell.js";
export default class Game {
    _map = new Array();
    _mapSize;
    _score;
    _moves;
    _gameOver;
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
    get randomValue() {
        let random_value = Math.floor((Math.random() * 11) / 2);
        let result = random_value == 5 || random_value == 4 ? 0 : random_value;
        return result;
    }
    constructor(mapSize) {
        this._mapSize = mapSize;
        this._score = 0;
        this._moves = 0;
        this._gameOver = false;
        this._map = this.generateMap();
    }
    generateMap() {
        let map = new Array();
        map.map(r => r.fill(new Cell(0, 0, 1, "none", false, null)));
        for (let i = 0; i < this._mapSize + 2; i++) {
            map[i] = new Array();
            for (let j = 0; j < this._mapSize + 2; j++) {
                if (i == 0 || j == 0 || i == this._mapSize + 1 || j == this.mapSize + 1)
                    map[i][j] = new ProtoCell(-1);
                else {
                    let random_value = Math.floor((Math.random() * 11) / 2);
                    let result = random_value == 5 || random_value == 4 ? 0 : random_value;
                    map[i][j] = new Cell(i, j, result, "none", false, null);
                }
            }
        }
        map = this.CorrectMapLayout(map);
        return map;
    }
    CorrectMapLayout(_map) {
        for (let i = 1; i < this.mapSize + 1; i++) {
            for (let j = 1; j < this.mapSize + 1; j++) {
                if (_map[i][j].fruits > 0) {
                    if (_map[i - 1][j].fruits <= 0 && _map[i][j - 1].fruits <= 0) {
                        _map[i][j - 1].fruits = this.randomValue;
                        _map[i - 1][j].fruits = this.randomValue;
                    }
                    if (_map[i + 1][j].fruits <= 0 && _map[i][j + 1].fruits <= 0) {
                        _map[i][j + 1].fruits = this.randomValue;
                        _map[i + 1][j].fruits = this.randomValue;
                    }
                }
            }
        }
        for (let i = 1; i < this.mapSize + 1; i++) {
            for (let j = 1; j < this.mapSize + 1; j++) {
                if (_map[i][j].fruits > 0) {
                    if (_map[i - 1][j - 1].fruits > 0 &&
                        _map[i - 1][j].fruits > 0 &&
                        _map[i - 1][j + 1].fruits > 0 &&
                        _map[i][j - 1].fruits > 0 &&
                        _map[i][j + 1].fruits > 0 &&
                        _map[i + 1][j - 1].fruits > 0 &&
                        _map[i + 1][j].fruits > 0 &&
                        _map[i + 1][j + 1].fruits > 0)
                        _map[i][j].fruits = 0;
                }
            }
        }
        return _map;
    }
}
