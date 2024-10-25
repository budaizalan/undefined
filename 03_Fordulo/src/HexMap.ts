import Hex from "./Hex.js";
import HexMath from "./HexMath.js";


export default class HexMap {
    private _hexMap: Map<string, Hex>;

    constructor(mapRadius: number) {
        this._hexMap = new Map();
        this.initializeMap(mapRadius);
    }

    private initializeMap(mapRadius: number): void {
        console.log(Math.round(-innerHeight / HexMath.hexHeight) - 1);
        console.log(-innerWidth / 2)
        console.log(Math.round(-innerWidth / 2 / (HexMath.hexWidth * 0.75)));
        for (let q = -mapRadius; q <= mapRadius; q++) {
            for (let r = -mapRadius; r <= mapRadius; r++) {
                if (Math.abs(q + r) <= mapRadius) {
                    const { x, y } = HexMath.hexToPixel(q, r);
                    if(Math.abs(x) >= 0 && Math.abs(x) < window.innerWidth / 2 + HexMath.hexSize && Math.abs(y) >= 0 && Math.abs(y) < window.innerHeight / 2 + HexMath.hexSize) {
                        // console.log(`q: ${q}, r: ${r}, x: ${x}, y: ${y}`);
                        this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y));
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