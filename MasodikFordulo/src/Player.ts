export default class Player {
    private _position: { x: number, y: number };

    get position() {
        return this._position;
    }

    constructor(x: number, y: number) {
        this._position = { x, y };
    }

    teleport(x: number, y: number) {
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