import Hex from "./Hex.js";
import Images from "./Images.js";

export default class City{
    private _id: number;
    private _requirements: string[];
    private _isSupplied: boolean = false;
    private _cover: Hex[];
    private _position: {r: number, q: number};

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

    get position(): {r: number, q: number}{
        return this._position
    }

    public setIsSupplied(_isSupplied: boolean){
        this._isSupplied = _isSupplied;
    }

    constructor(_id:number, _requirements: string[], _cover: Hex[], _position: {r: number, q: number}) {
        this._id = _id;
        this._requirements = _requirements;
        this._cover = _cover;
        this._position = _position;
    }
}