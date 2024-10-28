export default class Hex {
    _position;
    _coords;
    _terrain;
    _terrainImage = new Image();
    _structure = undefined;
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
    get structure() {
        return this._structure;
    }
    setTerrain(terrain, terrainImage) {
        this._terrain = terrain;
        this._terrainImage = terrainImage;
    }
    setStructure(_structure) {
        this._structure = _structure;
    }
    get terrainImage() {
        return this._terrainImage;
    }
    constructor(q, r, x, y, terrain = 'grass') {
        this._position = { q, r };
        this._coords = { x, y };
        this._terrain = terrain;
        this._terrainImage.src = `./assets/${this._terrain}.png`;
    }
}
