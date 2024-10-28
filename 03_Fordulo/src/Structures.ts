import Hex from "./Hex.js";
import Images from "./Images.js";

const images = new Images();

class City{
    private _requirements: string[];
    private _isSupplied: boolean = false;
    private _cover: Hex[];

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

    constructor(_requirements: string[], _cover: Hex[]) {
        this._requirements = _requirements;
        this._cover = _cover;
        this._cover.map(h => {h.setTerrain('stone', images.stoneImage);  
        });
    }
}

class Factory{
    private _productionType: string;
    private _range: number
    private _position: Hex | undefined;

    get productionType() : string{
        return this._productionType;
    }

    get range():number{
        return this._range;
    }

    get position(): Hex | undefined{
        return this._position;
    }

    public setPosition(_position: Hex){
        this._position = _position;
    }
    
    constructor(_productionType: string, _range: number) {
        this._productionType = _productionType;
        this._range = _range
    }
}

export {City, Factory};