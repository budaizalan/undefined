import HexMap from "./HexMap.js";
export default class Game {
    static _mapRadius = 8;
    static _hexMap = new HexMap(this._mapRadius);
    static _factoryTypesCount = { 'blue': 2, 'green': 1, 'red': 1 };
    static _factories = [];
    static _draggingFactory = null;
    static get factories() {
        return Game._factories;
    }
    static get mapRadius() {
        return Game._mapRadius;
    }
    static get hexMap() {
        return Game._hexMap;
    }
    static get factoryTypesCount() {
        return Game._factoryTypesCount;
    }
    static get draggingFactory() {
        return Game._draggingFactory;
    }
    static set draggingFactory(value) {
        Game._draggingFactory = value;
    }
}
