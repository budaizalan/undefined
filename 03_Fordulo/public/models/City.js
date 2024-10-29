export default class City {
    _id;
    _requirements;
    _isSupplied = false;
    _cover;
    _position;
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
    get position() {
        return this._position;
    }
    setIsSupplied(_isSupplied) {
        this._isSupplied = _isSupplied;
    }
    constructor(_id, _requirements, _cover, _position) {
        this._id = _id;
        this._requirements = _requirements;
        this._cover = _cover;
        this._position = _position;
    }
}
