export default class Objective{
    private _difficulty;
    private _factoriesToPlace = 3;
    private _types: string[] = ["A1", "B2", "C3"]

    get difficulty(): number{
        return this._difficulty;
    }

    get factoriesToPlace(): number{
        return this._factoriesToPlace;
    }

    get types(): string[]{
        return this._types;
    }

    public setDifficulty(_difficulty: number){
        this._difficulty = _difficulty;
    }    
    
    public setFactoriesToPlace(_toPlace: number){
        this._factoriesToPlace = _toPlace;
    } 

    constructor(_difficulty: number) {
        this._difficulty = _difficulty
    }
}