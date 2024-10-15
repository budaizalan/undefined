import { ProtoCell } from "./Cell";

export default class Player {
    public _position: { x: number, y: number };
    private _freezed: boolean = false;

    get position() {
        return this._position;
    }

    get freezed() {
        return this._freezed;
    }

    set freezed(value: boolean) {
        this._freezed = value;
    }

    constructor(x: number, y: number) {
        this._position = { x, y };
    }

    teleport(x: number, y: number) {
        this._position = { x, y };
    }

    moveUp() {
        if (this.position.y > 1) {this._position.y--;}
    }

    moveDown() {
        if (this.position.y < 10) {this._position.y++;}
    }

    moveLeft() {
        if (this.position.x > 1) {this._position.x--;}
    }

    moveRight() {
        if (this.position.x < 10) {this._position.x++;}
    }

    dashUp(map: Array<Array<ProtoCell>>): Array<Array<number>> {
        let dashCoordinates = [[this._position.x, this.position.y], [this._position.x, this.position.y]];
        let maxDash = this._position.y - 1;
        for (let i = 1; i <= maxDash; i++) {
            if (map[this._position.y - 1][this._position.x].fruits != 0) {
                this._position.y -= 1;
            } else{
                break;
            }
        }
        dashCoordinates[0][1] = this._position.y;
        return dashCoordinates;
    }

    dashDown(map: Array<Array<ProtoCell>>): Array<Array<number>> {
        let dashCoordinates = [[this._position.x, this.position.y], [this._position.x, this.position.y]];
        let maxDash = (map.length - 2) - this._position.y;
        for (let i = 1; i <= maxDash; i++) {
            if (map[this._position.y + 1][this._position.x].fruits != 0) {
                this._position.y += 1;
            } else{
                break;
            }
        }
        dashCoordinates[1][1] = this._position.y;
        return dashCoordinates;
    }

    dashLeft(map: Array<Array<ProtoCell>>): Array<Array<number>> {
        let dashCoordinates = [[this._position.x, this.position.y], [this._position.x, this.position.y]];
        let maxDash = this._position.x - 1;
        for (let i = 1; i <= maxDash; i++) {
            if (map[this._position.y][this._position.x - 1].fruits != 0) {
                this._position.x -= 1;
            } else{
                break;
            }
        }
        dashCoordinates[0][0] = this._position.x;
        return dashCoordinates;
    }

    dashRight(map: Array<Array<ProtoCell>>): Array<Array<number>> {
        let dashCoordinates = [[this._position.x, this.position.y], [this._position.x, this.position.y]];
        let maxDash = (map.length - 2) - this._position.x;
        for (let i = 1; i <= maxDash; i++) {
            if (map[this._position.y][this._position.x + 1].fruits != 0) {
                this._position.x += 1;
            } else{
                break;
            }
        }
        dashCoordinates[1][0] = this._position.x;
        return dashCoordinates;
    }
}