import Images from "./Images.js";
const images = new Images();
// abstract class Structure{
//     protected _cover: Hex[]; 
//     get cover(): Hex[] {
//         return this._cover;
//     }
//     constructor(_cover: Hex[]) {
//         this._cover = _cover;        
//     }
// }
class City {
    _requirements;
    _isSupplied = false;
    _cover;
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
    constructor(_requirements, _cover) {
        this._requirements = _requirements;
        this._cover = _cover;
        this._cover.map(h => h.setTerrain('stone', images.stoneImage));
    }
}
class Factory {
    _productionType;
    _range;
    get productionType() {
        return this._productionType;
    }
    get range() {
        return this._range;
    }
    constructor(_productionType, _range) {
        this._productionType = _productionType;
        this._range = _range;
    }
}
export { City, Factory };
