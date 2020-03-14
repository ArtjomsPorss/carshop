import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars/cars.service';
import { CarHelper } from '../car/car-helper';
import { OptionService } from '../option/option.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../car/car';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent extends CarHelper implements OnInit {

  car: Car;

  constructor(optionService: OptionService,
    private router: Router,
    private route: ActivatedRoute,
    private carsService: CarsService,
    ) {
    super(optionService);
   }

  ngOnInit(): void {
    this.getCar();
  }

  getCar() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
      .subscribe(car => { this.car = car; console.log(car)});
  }

    
  updateEdits(): void {
    console.info("update edits is called");
    this.carsService.updateCarDetails(this.car)
      .subscribe(article => {console.log(article)});
  }

}
