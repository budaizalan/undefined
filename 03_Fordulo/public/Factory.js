export default class Factory {
    _coords;
    _offset = { x: 0, y: 0 };
    _size = 50;
    _width = 2 * this._size;
    _height = Math.sqrt(3) * this._size;
    _factoryType;
    // private _factoryImage: HTMLImageElement = new Image();
    // private _factoryImageSrc: string;
    get x() {
        return this._coords.x;
    }
    set x(value) {
        this._coords.x = value;
    }
    get y() {
        return this._coords.y;
    }
    set y(value) {
        this._coords.y = value;
    }
    get offset() {
        return this._offset;
    }
    set offset(value) {
        this._offset = value;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get factoryType() {
        return this._factoryType;
    }
    // get factoryImage(): HTMLImageElement {
    //     return this._factoryImage;
    // }
    constructor(factoryType) {
        this._coords = { x: 0, y: 0 };
        this._factoryType = factoryType;
        // this._factoryImageSrc = `./assets/factory${this._factoryType}.png`;
        // this._factoryImage.src = this._factoryImageSrc;
    }
}
