import Hex from "./Hex.js";
import HexMath from "../utilities/HexMath.js";
export default class HexMap {
    _hexMap;
    constructor(mapRadius) {
        this._hexMap = new Map();
        this.initializeMap(mapRadius);
    }
    initializeMap(mapRadius) {
        HexMath.hexSize = Math.floor(((window.innerHeight / 2) / mapRadius) / Math.sqrt(3)) * 0.9;
        for (let q = -mapRadius; q <= mapRadius; q++) {
            for (let r = -mapRadius; r <= mapRadius; r++) {
                if (Math.abs(q + r) <= mapRadius) {
                    const { x, y } = HexMath.hexToPixel(q, r);
                    this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y));
                }
            }
        }
    }
    getHex(q, r) {
        return this._hexMap.get(`${q},${r}`);
    }
    setHex(hex) {
        this._hexMap.set(`${hex.q},${hex.r}`, hex);
    }
    getAllHexes() {
        return Array.from(this._hexMap.values());
    }
}
