export default class Hex {
    _position;
    _coords;
    _type = 'field';
    _terrain;
    _terrainImage = new Image();
    get q() {
        return this._position.q;
    }
    get r() {
        return this._position.r;
    }
    get x() {
        return this._coords.x;
    }
    get y() {
        return this._coords.y;
    }
    get terrain() {
        return this._terrain;
    }
    get type() {
        return this._type;
    }
    setType(type) {
        this._type = type;
    }
    setTerrain(terrain, terrainImage) {
        this._terrain = terrain;
        this._terrainImage = terrainImage;
    }
    get terrainImage() {
        return this._terrainImage;
    }
    constructor(q, r, x, y, type, terrain = 'grass') {
        this._position = { q, r };
        this._coords = { x, y };
        this._type = type || this._type;
        this._terrain = terrain;
        this._terrainImage.src = `./assets/${this._terrain}.png`;
    }
}
