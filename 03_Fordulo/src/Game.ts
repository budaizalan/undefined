import Hex from "./Hex.js";
import HexMap from "./HexMap.js";
import HexMath from "./HexMath.js";
import Images from "./Images.js";
import Objective from "./Objective.js";
import { City, Factory } from "./Structures.js";

const images = new Images();

export default abstract class Game {
    private static _mapRadius = 8;
    private static _hexMap = new HexMap(this._mapRadius);
    private static _objective: Objective | undefined = undefined;
    private static _cities: City[] = [];
    private static _factories: Factory[] = [];
    private static _factoriesToPlace: Factory[] = [];
    private static _placedFactory: Factory;

    static get mapRadius(): number {
        return Game._mapRadius;
    }

    static get hexMap(): HexMap {
        return Game._hexMap;
    }

    static get objective(): Objective | undefined {
        return this._objective;
    }

    static get cities(): City[] {
        return this._cities;
    }

    static get factories(): Factory[] {
        return this._factories;
    }

    static get factoriesToPlace(): Factory[] {
        return this._factoriesToPlace;
    }

    static get factoryToPlace(): Factory {
        this._placedFactory = this._factoriesToPlace[0];
        this._factoriesToPlace.shift();
        this.objective?.factoriesToPlace!-1;
        console.log(this._factoriesToPlace);        
        return this._placedFactory;
    }

    public static setPlacedFactory(_placed: Factory){
        this._placedFactory = _placed;
    }

    public static setObjective(_difficulty: number){
        this._objective = new Objective(_difficulty);
        this.generateStructures();
    }

    public static generateStructures(){
        switch (this._objective?.difficulty) {
            case 0:                
                 this.initializeDifficulty1();
            case 1:
                break;                      
            default:
                break;
        }
    }

    private static generateCity(_startHex: number[], _type: string[]){
        let hexes: Hex[] = [];
        HexMath.calculateRange(Game._hexMap.getHex(_startHex[0], _startHex[1])!, 1).forEach(v => hexes.push(Game._hexMap.getHex(v.q, v.r)!))
        return new City(_type, hexes)
    }

    private static initializeDifficulty1(){
        this._cities.push(this.generateCity([-4, -2], ["A1"]));
        this._factories.push(new Factory("A1", 2));
        this._cities.push(this.generateCity([5, -2], ["B1"]));
        this._factories.push(new Factory("B1", 2));
        this._cities.push(this.generateCity([-5, 7], ["C1"]));
        this._factories.push(new Factory("C1", 2));
        this._factoriesToPlace = this._factories;
        // console.log(this.cities);                        
        // console.log(this.factories); 
    }

    public static checkIntersection(){    
        HexMath.calculateRange(this._placedFactory.position!, this._placedFactory.range).map(v => Game._hexMap.getHex(v.q, v.r)).map(ph => {
            ph?.setTerrain("ocean", images.oceanImage)
            if(ph?.structure instanceof City && ph.structure.requirements.includes(this._placedFactory.productionType)){
                ph.structure.cover.map(phsc => (phsc.structure as City).setIsSupplied(true));
            };
        });    
    }
}