import Hex from "./Hex.js";
import Images from "./Images.js";

const images = new Images();

export default class City{
    private _id: number;
    private _requirements: string[];
    private _isSupplied: boolean = false;
    private _cover: Hex[];

    get id():number{
        return this._id;
    }

    get requirements() : string[]{
        return this._requirements;
    }

    get isSupplied(): boolean{
        return this._isSupplied;
    }

    get cover(): Hex[]{
        return this._cover;
    }

    public setIsSupplied(_isSupplied: boolean){
        this._isSupplied = _isSupplied;
    }

    constructor(_id:number, _requirements: string[], _cover: Hex[]) {
        this._id = _id;
        this._requirements = _requirements;
        this._cover = _cover;
    }
}