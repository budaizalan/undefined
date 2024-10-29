import Hex from "./Hex.js";
import HexMath from "../utilities/HexMath.js";


export default class HexMap {
    private _hexMap: Map<string, Hex>;

    constructor(mapRadius: number) {
        this._hexMap = new Map();
        this.initializeMap(mapRadius);
    }

    private initializeMap(mapRadius: number): void {
        HexMath.hexSize = Math.floor(((window.innerHeight / 2) / mapRadius) / Math.sqrt(3)) * 0.9
        for (let q = -mapRadius; q <= mapRadius; q++) {
            for (let r = -mapRadius; r <= mapRadius; r++) {
                if (Math.abs(q + r) <= mapRadius) {
                    const { x, y } = HexMath.hexToPixel(q, r);
                    this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y));
                }
            }
        }
    }

    public reset(): void {
        this._hexMap.forEach(hex => {
            hex.reset();
        });
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