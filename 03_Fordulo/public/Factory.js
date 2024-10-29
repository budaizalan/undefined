export default class Factory {
    _position;
    _coords;
    _size = 50;
    _width = 2 * this._size;
    _height = Math.sqrt(3) * this._size;
    _productionType;
    _range = 2;
    _onMap = false;
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
    get position() {
        return this._position;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this._width = 2 * this._size;
        this._height = Math.sqrt(3) * this._size;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    // get factoryType(): string {
    //     return this._factoryType;
    // }
    get productionType() {
        return this._productionType;
    }
    get range() {
        return this._range;
    }
    get onMap() {
        return this._onMap;
    }
    set onMap(value) {
        this._onMap = value;
    }
    setPosition(_position) {
        this._position = _position;
    }
    // get factoryImage(): HTMLImageElement {
    //     return this._factoryImage;
    // }
    constructor(_productionType, _range) {
        this._coords = { x: 0, y: 0 };
        this._productionType = _productionType;
        this._range = _range;
        // this._factoryImageSrc = `./assets/factory${this._factoryType}.png`;
        // this._factoryImage.src = this._factoryImageSrc;
    }
}
