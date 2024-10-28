import HexMap from "./HexMap.js";
import HexMath from "./HexMath.js";
import Objective from "./Objective.js";
import { City, Factory } from "./Structures.js";
export default class Game {
    static _mapRadius = 8;
    static _hexMap = new HexMap(this._mapRadius);
    static _objective = undefined;
    static _cities = [];
    static _factories = [];
    static _factoriesToPlace = [];
    static get mapRadius() {
        return Game._mapRadius;
    }
    static get hexMap() {
        return Game._hexMap;
    }
    static get objective() {
        return this._objective;
    }
    static get cities() {
        return this._cities;
    }
    static get factories() {
        return this._factories;
    }
    static get factoriesToPlace() {
        return this._factoriesToPlace;
    }
    static get factoryToPlace() {
        let factory = this._factoriesToPlace[0];
        this._factoriesToPlace.shift();
        console.log(this._factoriesToPlace);
        return factory;
    }
    static setObjective(_difficulty) {
        this._objective = new Objective(_difficulty);
        this.generateStructures();
    }
    static generateStructures() {
        switch (this._objective?.difficulty) {
            case 0:
                this.initializeDifficulty1();
            case 1:
                break;
            default:
                break;
        }
    }
    static generateCity(_startHex, _type) {
        let hexes = [];
        HexMath.calculateRange(Game._hexMap.getHex(_startHex[0], _startHex[1]), 1).forEach(v => hexes.push(Game._hexMap.getHex(v.q, v.r)));
        return new City(_type, hexes);
    }
    static initializeDifficulty1() {
        this._cities.push(this.generateCity([-4, -2], ["A1"]));
        this._factories.push(new Factory("A1", 2));
        this._cities.push(this.generateCity([5, -2], ["B1"]));
        this._factories.push(new Factory("B1", 2));
        this._cities.push(this.generateCity([-5, 7], ["C1"]));
        this._factories.push(new Factory("C1", 2));
        this._factoriesToPlace = this._factories;
        console.log(this.cities);
        console.log(this.factories);
    }
}
