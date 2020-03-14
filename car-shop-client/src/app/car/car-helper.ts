import { Car } from './car';
import { OptionService } from '../option/option.service';
import { Option } from '../option/Option';
import { SelectedOption } from '../option/selected-option';

export class CarHelper {

    options: Option[];

    constructor(protected optionService: OptionService){
        optionService.getAllOptions().subscribe(r => this.options = r);
    }

    totalPrice(car: Car): number {
        var sumOfOptions = car.selectedOptions.map(e => e.price).reduce((a,b) => a + b, 0)
        var total = car.price + sumOfOptions;
        return total;
    }

    getOptionLabel(option: SelectedOption): string{
        return this.options.find(e => e.id === option.selectedOption).name;
    }
}