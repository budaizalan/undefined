export default class Tankage {
    fuel_amount : number;
    date_full: Date;
    cost: number;
    km_meter_status: number;

    constructor(_fuel_amount:string, _date: Date, _cost: string, _km_meter_status: string){        // raw_data[] -> [fuel, date, cost, km_meter_status]
        this.fuel_amount = +_fuel_amount;
        this.date_full = _date;
        this.cost = +_cost;
        this.km_meter_status = +_km_meter_status;
    }
}