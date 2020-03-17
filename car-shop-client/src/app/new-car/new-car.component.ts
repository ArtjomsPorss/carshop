import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewRef, ViewChildren, QueryList, ContentChildren, ElementRef, ViewContainerRef, ContentChild } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionComponent } from '../option/option.component';
import { OptionParent } from '../option/option-parent';
import { CarHelper } from '../car/car-helper';
import { OptionService } from '../option/option.service';
import { SelectedOption } from '../option/selected-option';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent extends CarHelper  implements OnInit, OptionParent {

  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    optionService: OptionService
    ) { 
      super(optionService);
  }

  ngOnInit(): void {
    this.resetCarDetails();
    this.addOption();
  }

  save(): void {
    this.pickSelectedOptions();
    this.carsService.saveCar(this.car)
    .subscribe(car => {this.car = car; this.viewCar()});
  }

  viewCar() {
    this.router.navigate([`/car/${this.car.id}`], { relativeTo: this.route });
  }

}
