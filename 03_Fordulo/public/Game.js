import HexMap from "./HexMap.js";
export default class Game {
    static _mapRadius = 5;
    static _hexMap = new HexMap(this._mapRadius);
    static get mapRadius() {
        return Game._mapRadius;
    }
    static get hexMap() {
        return Game._hexMap;
    }
}
