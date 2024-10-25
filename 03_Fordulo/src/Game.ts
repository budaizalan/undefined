import HexMap from "./HexMap.js";

export default abstract class Game {
    private static _mapRadius = 25;
    private static _hexMap = new HexMap(this._mapRadius);

    static get mapRadius(): number {
        return Game._mapRadius;
    }

    static get hexMap(): HexMap {
        return Game._hexMap;
    }
}