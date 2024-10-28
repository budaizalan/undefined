import Images from "./Images.js";
const images = new Images();
export default class City {
    _id;
    _requirements;
    _isSupplied = false;
    _cover;
    get id() {
        return this._id;
    }
    get requirements() {
        return this._requirements;
    }
    get isSupplied() {
        return this._isSupplied;
    }
    get cover() {
        return this._cover;
    }
    setIsSupplied(_isSupplied) {
        this._isSupplied = _isSupplied;
    }
    constructor(_id, _requirements, _cover) {
        this._id = _id;
        this._requirements = _requirements;
        this._cover = _cover;
        this._cover.map(h => {
            h.setTerrain('stone', images.stoneImage);
        });
    }
}
// class Factory{
//     private _productionType: string;
//     private _range: number
//     private _position: Hex | undefined;
//     get productionType() : string{
//         return this._productionType;
//     }
//     get range():number{
//         return this._range;
//     }
//     get position(): Hex | undefined{
//         return this._position;
//     }
//     public setPosition(_position: Hex){
//         this._position = _position;
//     }
//     constructor(_productionType: string, _range: number) {
//         this._productionType = _productionType;
//         this._range = _range
//     }
// }
// export {City, Factory};
