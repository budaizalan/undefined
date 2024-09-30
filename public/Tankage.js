"use strict";
export default class Tankage {
    constructor(_fuel_amount, _date, _cost, _km_meter_status) {
        this.fuel_amount = +_fuel_amount;
        this.date_full = _date;
        this.day = this.date_full.getDate();
        this.month = this.date_full.getMonth();
        this.year = this.date_full.getFullYear();
        this.cost = +_cost;
        this.km_meter_status = +_km_meter_status;
    }
}