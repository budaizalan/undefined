export default class Tankage {
    fuel_amount;
    date_full;
    cost;
    km_meter_status;
    constructor(_fuel_amount, _date, _cost, _km_meter_status) {
        this.fuel_amount = +_fuel_amount;
        this.date_full = _date;
        this.cost = +_cost;
        this.km_meter_status = +_km_meter_status;
    }
}
