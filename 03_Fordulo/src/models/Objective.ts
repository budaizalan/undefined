export default abstract class Objective{
    private static _difficulty: number = 0;
    private static _factoriesToPlace: number = 3;
    private static _level: number = 0;
    private static _cities: [] = [];
    private static _factories: [] = [];


    static get difficulty(): number{
        return this._difficulty;
    }

    static get factoriesToPlace(): number{
        return this._factoriesToPlace;
    }

    static set factoriesToPlace(_toPlace: number){
        this._factoriesToPlace = _toPlace;
    }

    static get factories(): []{
        return this.factories;
    }

    static get level(): number{
        return this._level;
    }

    public static getCities(){
        return this._cities;
    }

    public static getFactories(){
        return this._factories;
    }

    public static setDifficulty(_difficulty: number){
        this._difficulty = _difficulty;
    }    
    
    public static setFactoriesToPlace(_toPlace: number){
        this._factoriesToPlace = _toPlace;
    }

    public static setLevel(level: any){
        this._level = level.level;
        this._cities = level.cities;
        this._factories = level.factories;
    }
}