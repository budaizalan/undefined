import Hex from "./Hex.js";
import Factory from "./Factory.js";
import HexMap from "./HexMap.js";
import HexMath from "./HexMath.js";
import Images from "./Images.js";
import Objective from "./Objective.js";
import City from "./Structures.js";

const images = new Images();

export default abstract class Game {
    private static _mapRadius = 8;
    private static _hexMap = new HexMap(this._mapRadius);
    private static _objective: Objective | undefined = undefined;
    private static _cities: City[] = [];
    private static _factories: Factory[] = [];
    private static _factoriesToPlace: Factory[] = [];
    private static _placedFactory: Factory;
    private static _factoryTypesCount: { [key: string]: number } = { 'blue': 2, 'green': 1, 'red': 1 };
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
        this.objective?.setFactoriesToPlace(this.objective?.factoriesToPlace!-1);
        console.log(this._factoriesToPlace);        
        return this._placedFactory;
    }

    public static setPlacedFactory(_placed: Factory) : void{
        this._placedFactory = _placed;
    }

    public static setObjective(_difficulty: number): void{
        this._objective = new Objective(_difficulty);
        this.generateStructures();
    }

    public static generateStructures(): void{
        switch (this._objective?.difficulty) {
            case 0:                
                 this.initializeDifficulty1();
            case 1:
                break;                      
            default:
                break;
        }
    }

    private static generateCity(_id:number, _startHex: number[], _type: string[]): City{
        let hexes: Hex[] = [];
        HexMath.calculateRange(Game._hexMap.getHex(_startHex[0], _startHex[1])!, 1).forEach(v => hexes.push(Game._hexMap.getHex(v.q, v.r)!))
        return new City(_id, _type, hexes)
    }    

    private static initializeDifficulty1(): void{
        this._cities.push(this.generateCity(1, [-4, -2], ["A1"]));
        this._factories.push(new Factory("A1", 2));
        this._cities.push(this.generateCity(2, [5, -2], ["B1"]));
        this._factories.push(new Factory("B1", 2));
        this._cities.push(this.generateCity(3, [-5, 7], ["C1"]));
        this._factories.push(new Factory("C1", 2));
        this._factoriesToPlace = this._factories;
    }

    public static setFactory(_hex: Hex): void{
        if (_hex && Game.factoriesToPlace.length != 0) {
            let factory: Factory = this.factoryToPlace;
            factory.setPosition(_hex);
            Game.setPlacedFactory(factory);
            _hex.setTerrain('stone', images.stoneImage);
        }
    }

    public static checkIntersection() : void{    
        console.log(this._placedFactory.position);
        
        HexMath.calculateRange(this._hexMap.getHex(this._placedFactory.position!.q, this._placedFactory.position!.r)!, this._placedFactory.range).map(v => Game._hexMap.getHex(v.q, v.r)).map(ph => {
            ph?.setTerrain("ocean", images.oceanImage)
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
        if(this.objective?.factoriesToPlace! == 0) {
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