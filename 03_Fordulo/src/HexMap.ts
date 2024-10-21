import Hex from "./Hex.js";
import HexMath from "./HexMath.js";


export default class HexMap {
    private _hexMap: Map<string, Hex>;

    constructor(mapRadius: number) {
        this._hexMap = new Map();
        this.initializeMap(mapRadius);
    }

    private initializeMap(mapRadius: number): void {
        for (let q = -mapRadius; q <= mapRadius; q++) {
            for (let r = -mapRadius; r <= mapRadius; r++) {
                if (Math.abs(q + r) <= mapRadius) {
                    const { x, y } = HexMath.hexToPixel(q, r);
                    let doSmth = Math.floor(Math.random() * 10);
                    if (doSmth == 0) {
                        this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y, true));
                    } else {
                        this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y, false));
                    }
                }
            }
        }
    }

    getHex(q: number, r: number): Hex | undefined {
        return this._hexMap.get(`${q},${r}`);
    }

    setHex(hex: Hex): void {
        this._hexMap.set(`${hex.q},${hex.r}`, hex);
    }

    getAllHexes(): Hex[] {
        return Array.from(this._hexMap.values());
    }
}