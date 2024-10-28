import Factory from "./Factory.js";
import HexMap from "./HexMap.js";

export default abstract class Game {
    private static _mapRadius = 8;
    private static _hexMap = new HexMap(this._mapRadius);
    private static _factoryTypesCount: { [key: string]: number } = { 'blue': 2, 'green': 1, 'red': 1 };
    private static _factories: Array<Factory> = [];
    private static _draggingFactory: Factory | null = null;

    static get factories(): Array<Factory> {
        return Game._factories;
    }

    static get mapRadius(): number {
        return Game._mapRadius;
    }

    static get hexMap(): HexMap {
        return Game._hexMap;
    }

    static get factoryTypesCount(): { [key: string]: number } {
        return Game._factoryTypesCount;
    }

    static get draggingFactory(): Factory | null {
        return Game._draggingFactory;
    }

    static set draggingFactory(value: Factory | null) {
        Game._draggingFactory = value;
    }

}