import { Car } from './car';
import { OptionService } from '../option/option.service';
import { Option } from '../option/Option';
import { SelectedOption } from '../option/selected-option';
import { Router, ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';

export class CarHelper {

    car: Car;
    options: Option[];

    constructor(protected optionService: OptionService
        )
    {
        this.optionService.getAllOptions().subscribe(r => this.options = r);
    }
    

    totalPrice(car: Car): number {
        var sumOfOptions = car.selectedOptions.map(e => e.price).reduce((a,b) => Number(a) + Number(b), 0)
        var total = Number(car.price) + sumOfOptions;
        return total;
    }

    getOptionLabel(option: SelectedOption): string{
        return this.options.find(e => e.id === this.getNumber(option.selectedOption)).name;
    }

    resetCarDetails(): void {
        this.car = {
            id: null,
            make: '',
            model: '',
            edition: '',
            price: null,
            selectedOptions: []
        }
    }

    getNumber(value: any): number{
        return isNaN(value) ? 0 : Number(value);
    }
    
    addOption(): void{
    this.car.selectedOptions.push({
        carId: this.car.id,
        selectedOption: 0,
        price: 0
    });
    }

    removeOption(option: SelectedOption): void {
        this.car.selectedOptions = this.car.selectedOptions.filter(e => e !== option);
    }
    
    pickSelectedOptions() {
        this.car.selectedOptions = this.car.selectedOptions.filter(o => o.selectedOption !== 0);
    }
}
