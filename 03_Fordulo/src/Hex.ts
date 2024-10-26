export default class Hex {
    private _position: { q: number; r: number };
    private _coords: { x: number; y: number };
    private _terrain: string;
    private _terrainImage: HTMLImageElement = new Image();

    get q(): number {
        return this._position.q;
    }

    get r(): number {
        return this._position.r;
    }

    get x(): number {
        return this._coords.x;
    }

    get y(): number {
        return this._coords.y;
    }

    get terrain(): string {
        return this._terrain;
    }

    public setTerrain(terrain: string, terrainImage: HTMLImageElement) {
        this._terrain = terrain;
        this._terrainImage = terrainImage;
    }

    get terrainImage(): HTMLImageElement {
        return this._terrainImage;
    }

    constructor(q: number, r: number, x: number, y: number, terrain: string = 'grass') {
        this._position = { q, r };
        this._coords = { x, y };
        this._terrain = terrain;
        this._terrainImage.src = `./assets/${this._terrain}.png`;
    }
}