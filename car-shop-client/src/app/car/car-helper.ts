import { Car } from './car';

export class CarHelper {

    constructor(){}

    totalPrice(car: Car): number {
        var sumOfOptions = car.selectedOptions.map(e => e.price).reduce((a,b) => a + b, 0)
        var total = car.price + sumOfOptions;
        return total;
    }
}