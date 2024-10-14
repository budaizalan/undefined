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
        if (this.position.x > 1) {
            this._position.x--;
        }
    }
    moveDown() {
        if (this.position.x < 10) {
            this._position.x++;
        }
    }
    moveLeft() {
        if (this.position.y > 1) {
            this._position.y--;
        }
    }
    moveRight() {
        if (this.position.y < 10) {
            this._position.y++;
        }
    }
    dashUp() {
    }
    dashDown() {
    }
    dashLeft() {
    }
    dashRight() {
    }
}
