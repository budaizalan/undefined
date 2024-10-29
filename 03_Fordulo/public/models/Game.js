import Factory from "./Factory.js";
import HexMap from "./HexMap.js";
import HexMath from "../utilities/HexMath.js";
import Images from "./Images.js";
import City from "./City.js";
export default class Game {
    static _mapRadius = 8;
    static _hexMap = new HexMap(this._mapRadius);
    static _objective = undefined;
    static _cities = [];
    static _factories = [];
    static _factoriesToPlace = [];
    static _placedFactory;
    static _factoryTypesCount = { 'blue': 1, 'green': 1, 'red': 1 };
    static _params;
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
    static get generateParams() {
        return this._params;
    }
    static AdjustParams(position) {
        this._params = position;
        this.generateLevel();
    }
    static factoryToPlace(factory) {
        this._placedFactory = factory;
        // this._factoriesToPlace.shift();
        // this.objective?.setFactoriesToPlace(this.objective?.factoriesToPlace!-1);
        this._factoryTypesCount[this._placedFactory.productionType] -= 1;
    }
    static setPlacedFactory(_placed) {
        this._placedFactory = _placed;
    }
    static generateCity(_id, _startHex, _type) {
        let hexes = [];
        const middleHex = Game._hexMap.getHex(_startHex[0], _startHex[1]);
        middleHex.setTerrain('city', Images.cityImage);
        HexMath.calculateRange(middleHex, 1).forEach(v => {
            const hex = Game._hexMap.getHex(v.q, v.r);
            hex.setType('city');
            hexes.push(hex);
        });
        return new City(_id, _type, hexes, { q: _startHex[0], r: _startHex[1] });
    }
    static generateLevel() {
        console.log(`${this.generateParams}`);
        this._cities = [];
        this._factories = [];
        this._cities.push(this.generateCity(1, [this._params[0], this._params[1]], ["blue"]));
        this._factories.push(new Factory("blue", 2));
        this._cities.push(this.generateCity(2, [this._params[0], this._params[1]], ["green"]));
        this._factories.push(new Factory("green", 2));
        this._cities.push(this.generateCity(3, [this._params[0], this._params[1]], ["red"]));
        this._factories.push(new Factory("red", 2));
        this._factoriesToPlace = this._factories;
    }
    static setFactory(_hex, factory) {
        if (_hex && Game.factoriesToPlace.length != 0) {
            Game.factoryToPlace(factory);
            factory.setPosition(_hex);
            Game.setPlacedFactory(this._placedFactory);
            _hex.setTerrain(factory.productionType, Images.getFactoryImage(factory.productionType));
            _hex.setType('factory');
        }
    }
    static checkIntersection() {
        HexMath.calculateRange(this._hexMap.getHex(this._placedFactory.position.q, this._placedFactory.position.r), this._placedFactory.range).map(v => Game._hexMap.getHex(v.q, v.r)).map(ph => {
            // ph?.setTerrain("ocean", Images.oceanImage)
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
