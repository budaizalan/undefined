import Hex from "./Hex.js";
import HexMath from "./HexMath.js";
export default class HexMap {
    _hexMap;
    constructor(mapRadius) {
        this._hexMap = new Map();
        this.initializeMap(mapRadius);
    }
    initializeMap(mapRadius) {
        for (let q = -mapRadius; q <= mapRadius; q++) {
            for (let r = -mapRadius; r <= mapRadius; r++) {
                if (Math.abs(q + r) <= mapRadius) {
                    const { x, y } = HexMath.hexToPixel(q, r);
                    let doSmth = Math.floor(Math.random() * 10);
                    if (doSmth == 0) {
                        this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y, true));
                    }
                    else {
                        this._hexMap.set(`${q},${r}`, new Hex(q, r, x, y, false));
                    }
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
