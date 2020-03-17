import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars/cars.service';
import { CarHelper } from '../car/car-helper';
import { OptionService } from '../option/option.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionParent } from '../option/option-parent';
import { SelectedOption } from '../option/selected-option';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent extends CarHelper implements OnInit, OptionParent {

  constructor(optionService: OptionService,
    private router: Router,
    private route: ActivatedRoute,
    private carsService: CarsService
    ) 
  {
    super(optionService);
  }
  
  ngOnInit(): void {
    this.resetCarDetails();
    this.getCar();
  }
  
  getCar() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
    .subscribe(car => { this.car = car; this.addOption();});
  }

  updateEdits(): void {
    this.pickSelectedOptions();  
    this.carsService.updateCarDetails(this.car)
      .subscribe(retVal => this.viewCar());
  }

  viewCar() {
    this.router.navigate([`/car/${this.car.id}`], { relativeTo: this.route });
  }

}
