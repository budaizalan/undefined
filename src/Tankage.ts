export default class Tankage {
    fuel_amount : number;
    date_full: Date;
    day: number;
    month: number;
    year: number;
    cost: number;
    km_meter_status: number;

    constructor(_fuel_amount:string, _date: Date, _cost: string, _km_meter_status: string){        // raw_data[] -> [fuel, date, cost, km_meter_status]
        this.fuel_amount = +_fuel_amount;
        this.date_full = _date;
        this.day = this.date_full.getDate();
        this.month = this.date_full.getMonth();
        this.year = this.date_full.getFullYear();
        this.cost = +_cost;
        this.km_meter_status = +_km_meter_status;
    }
}