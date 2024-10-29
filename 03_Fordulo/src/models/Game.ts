import Hex from "./Hex.js";
import Factory from "./Factory.js";
import HexMap from "./HexMap.js";
import HexMath from "../utilities/HexMath.js";
import Images from "./Images.js";
import City from "./City.js";
import Levels from "./Levels.js";
import Objective from "./Objective.js";

export default abstract class Game {
    private static _mapRadius = 8;
    private static _hexMap = new HexMap(this._mapRadius);
    private static _cities: City[] = [];
    private static _factories: Factory[] = [];
    private static _factoriesToPlace: Factory[] = [];
    private static _placedFactory: Factory;
    private static _factoryTypesCount: { [key: string]: number } = { 'blue': 1, 'green': 1, 'red': 1 };
    private static _params: Array<number>;
    // ====
    private static _factories2: Array<Factory> = [];
    // ====
    private static _draggingFactory: Factory | null = null;

    static get factories2(): Array<Factory> {
        return Game._factories2;
    }

    static get mapRadius(): number {
        return Game._mapRadius;
    }

    static get hexMap(): HexMap {
        return Game._hexMap;
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

    static get generateParams(): Array<number>{
        return this._params;
    }

    static factoryToPlace(factory: Factory): void {
        this._placedFactory = factory;
        // this._factoriesToPlace.shift();
        // this.objective?.setFactoriesToPlace(this.objective?.factoriesToPlace!-1);
        this._factoryTypesCount[this._placedFactory.productionType]-=1;
    }

    public static setPlacedFactory(_placed: Factory) : void{
        this._placedFactory = _placed;
    }
    
    private static generateCity(_id:number, _startHex: number[], _type: string[]): City{
        let hexes: Hex[] = [];
        const middleHex = Game._hexMap.getHex(_startHex[0], _startHex[1])!;
        middleHex.setTerrain('city', Images.cityImage);
        HexMath.calculateRange(middleHex, 1).forEach(v => {
            const hex = Game._hexMap.getHex(v.q, v.r)!;
            hex.setType('city');
            hexes.push(hex);
        });
        return new City(_id, _type, hexes, {q : _startHex[0], r : _startHex[1]})
    }    

    public static generateLevel(level: number): void{
        Objective.setLevel(Levels.levels[level-1]);
        this._cities = [];
        this._factories = [];
        Objective.getCities().forEach((c: { id: number, position: { q: number, r: number }, type: string }) => {
            this._cities.push(this.generateCity(c.id, [c.position.q, c.position.r], [c.type]));
        });
        Objective.getFactories().forEach((f: { productionType: string; range: number}) => {
             this._factories.push(new Factory(f.productionType, f.range));
        });
        console.log(this._cities);
        console.log(this._factories);
        this._factoriesToPlace = this._factories;
    }

    public static setFactory(_hex: Hex, factory: Factory): void{
        if (_hex && Game.factoriesToPlace.length != 0) {
            Game.factoryToPlace(factory);
            factory.setPosition(_hex);
            Game.setPlacedFactory(this._placedFactory);
            _hex.setTerrain(factory.productionType, Images.getFactoryImage(factory.productionType));
            _hex.setType('factory');
        }
    }

    public static checkIntersection() : void{            
        HexMath.calculateRange(this._hexMap.getHex(this._placedFactory.position!.q, this._placedFactory.position!.r)!, this._placedFactory.range).map(v => Game._hexMap.getHex(v.q, v.r)).map(ph => {
            this.cities.map(c => c.cover.map(ch =>{
                if(c.requirements.includes(this._placedFactory.productionType) && ch === ph){
                    c.setIsSupplied(true);
                }
            }));           
        });    
    }

    public static getUnsuppliedCities(): City[]{
        return this.cities.filter(c => c.isSupplied == false);
    }

    public static checkEndGame(){
        if(Objective.factoriesToPlace == 0) {
            this.isSolutionCorrect();
            return true;
        }
        return false;
    }

    public static isSolutionCorrect(): void{
        let unsuppliedCities: City[] = this.getUnsuppliedCities();
        if(unsuppliedCities.length == 0){
            console.log('Helyes megoldás, gratula!');
        } else{
            let returnString: string = "";
            unsuppliedCities.forEach(c => returnString+= ` ${c.id}.`)
            console.log((`${returnString} városok nem kaptak megfelelő ellátást!`));
        }
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