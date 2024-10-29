import Factory from "./Factory.js";
import HexMap from "./HexMap.js";
import HexMath from "../utilities/HexMath.js";
import Images from "./Images.js";
import City from "./City.js";
import Levels from "./Levels.js";
import Objective from "./Objective.js";
export default class Game {
    static _mapRadius = 8;
    static _hexMap = new HexMap(this._mapRadius);
    static _cities = [];
    static _factories = [];
    static _factoriesToPlace = [];
    static _placedFactory;
    static _factoryTypesCount = {};
    static _draggingFactory = null;
    static get mapRadius() {
        return Game._mapRadius;
    }
    static get hexMap() {
        return Game._hexMap;
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
    static reset() {
        this._hexMap.reset();
        this._cities = [];
        this._factories = [];
        this._factoriesToPlace = [];
        this._placedFactory = new Factory('', 0);
        this._factoryTypesCount = {};
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
    static generateLevel(level) {
        Objective.setLevel(Levels.levels[level - 1]);
        Objective.getCities().forEach((c) => {
            this._cities.push(this.generateCity(c.id, [c.position.q, c.position.r], [c.type]));
        });
        Objective.getFactories().forEach((f) => {
            this._factories.push(new Factory(f.type, 2));
            this._factoryTypesCount[f.type] = this._factoryTypesCount[f.type] ? this._factoryTypesCount[f.type] + f.amount : f.amount;
        });
        console.log(this.factoryTypesCount);
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
            this.cities.map(c => c.cover.map(ch => {
                if (c.requirements.includes(this._placedFactory.productionType) && ch === ph) {
                    c.setIsSupplied(true);
                }
            }));
        });
        Objective.setFactoriesToPlace(Objective.factoriesToPlace - 1);
        console.log(Objective.factoriesToPlace);
    }
    static getUnsuppliedCities() {
        return this.cities.filter(c => c.isSupplied == false);
    }
    static checkEndGame() {
        if (Objective.factoriesToPlace == 0) {
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
