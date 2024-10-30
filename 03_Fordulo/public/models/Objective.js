export default class Objective {
    static _difficulty = 0;
    static _factoriesToPlace = 3;
    static _level = 0;
    static _cities = [];
    static _factories = [];
    static get difficulty() {
        return this._difficulty;
    }
    static get factoriesToPlace() {
        return this._factoriesToPlace;
    }
    static set factoriesToPlace(_toPlace) {
        this._factoriesToPlace = _toPlace;
    }
    static get factories() {
        return this.factories;
    }
    static get level() {
        return this._level;
    }
    static getCities() {
        return this._cities;
    }
    static getFactories() {
        return this._factories;
    }
    static setDifficulty(_difficulty) {
        this._difficulty = _difficulty;
    }
    static setFactoriesToPlace(_toPlace) {
        this._factoriesToPlace = _toPlace;
    }
    static setLevel(level) {
        this._level = level.level;
        this._cities = level.cities;
        this._factories = level.factories;
    }
}
