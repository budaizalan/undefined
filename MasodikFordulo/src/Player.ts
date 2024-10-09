export default class Player {
    public _position: { x: number, y: number };

    get position() {
        return this._position;
    }

    constructor(x: number, y: number) {
        this._position = { y, x };
    }

    teleport(x: number, y: number) {
        this._position = { y, x };
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