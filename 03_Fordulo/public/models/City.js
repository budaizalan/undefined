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
    }
}
