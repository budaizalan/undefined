import Factory from "./Factory.js";
import HexMap from "./HexMap.js";
import HexMath from "./HexMath.js";
import Images from "./Images.js";
import Objective from "./Objective.js";
import City from "./Structures.js";
const images = new Images();
export default class Game {
    static _mapRadius = 8;
    static _hexMap = new HexMap(this._mapRadius);
    static _objective = undefined;
    static _cities = [];
    static _factories = [];
    static _factoriesToPlace = [];
    static _placedFactory;
    static _factoryTypesCount = { 'blue': 1, 'green': 1, 'red': 1 };
    // ====
    static _factories2 = [];
    // ====
    static _draggingFactory = null;
    static get factories2() {
        return Game._factories2;
    }
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
        this._placedFactory = this._factoriesToPlace[0];
        this._factoriesToPlace.shift();
        this.objective?.setFactoriesToPlace(this.objective?.factoriesToPlace - 1);
        this._factoryTypesCount[this._placedFactory.productionType] -= 1;
        console.log(this._factoriesToPlace);
        return this._placedFactory;
    }
    static setPlacedFactory(_placed) {
        this._placedFactory = _placed;
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
    static generateCity(_id, _startHex, _type) {
        let hexes = [];
        HexMath.calculateRange(Game._hexMap.getHex(_startHex[0], _startHex[1]), 1).forEach(v => hexes.push(Game._hexMap.getHex(v.q, v.r)));
        return new City(_id, _type, hexes);
    }
    static initializeDifficulty1() {
        this._cities.push(this.generateCity(1, [-4, -2], ["blue"]));
        this._factories.push(new Factory("blue", 2));
        this._cities.push(this.generateCity(2, [5, -2], ["green"]));
        this._factories.push(new Factory("green", 2));
        this._cities.push(this.generateCity(3, [-5, 7], ["red"]));
        this._factories.push(new Factory("red", 2));
        this._factoriesToPlace = this._factories;
    }
    static setFactory(_hex) {
        if (_hex && Game.factoriesToPlace.length != 0) {
            let factory = this.factoryToPlace;
            factory.setPosition(_hex);
            Game.setPlacedFactory(factory);
            _hex.setTerrain('stone', images.stoneImage);
        }
    }
    static checkIntersection() {
        console.log(this._placedFactory.position);
        HexMath.calculateRange(this._hexMap.getHex(this._placedFactory.position.q, this._placedFactory.position.r), this._placedFactory.range).map(v => Game._hexMap.getHex(v.q, v.r)).map(ph => {
            ph?.setTerrain("ocean", images.oceanImage);
            this.cities.map(c => c.cover.map(ch => {
                if (c.requirements.includes(this._placedFactory.productionType) && ch === ph) {
                    c.setIsSupplied(true);
                }
            }));
        });
    }
    static getUnsuppliedCities() {
        return this.cities.filter(c => c.isSupplied == false);
    }
    static checkEndGame() {
        if (this.objective?.factoriesToPlace == 0) {
            this.isSolutionCorrect();
            return true;
        }
        return false;
    }
    static isSolutionCorrect() {
        let unsuppliedCities = this.getUnsuppliedCities();
        if (unsuppliedCities.length == 0) {
            console.log('Helyes megoldás, gratula!');
        }
        else {
            let returnString = "";
            unsuppliedCities.forEach(c => returnString += ` ${c.id}.`);
            console.log((`${returnString} városok nem kaptak megfelelő ellátást!`));
        }
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
