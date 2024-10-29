export default class Objective {
    _difficulty;
    _factoriesToPlace = 3;
    get difficulty() {
        return this._difficulty;
    }
    get factoriesToPlace() {
        return this._factoriesToPlace;
    }
    setDifficulty(_difficulty) {
        this._difficulty = _difficulty;
    }
    setFactoriesToPlace(_toPlace) {
        this._factoriesToPlace = _toPlace;
    }
    constructor(_difficulty) {
        this._difficulty = _difficulty;
    }
}
