export default class Player {
    _position;
    get position() {
        return this._position;
    }
    constructor(x, y) {
        this._position = { x, y };
    }
    teleport(x, y) {
        this._position = { x, y };
    }
    moveUp() {
        this._position.y--;
    }
    moveDown() {
        this._position.y++;
    }
    moveLeft() {
        this._position.x--;
    }
    moveRight() {
        this._position.x++;
    }
}
