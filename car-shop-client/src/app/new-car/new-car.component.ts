import { Component, OnInit } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionService } from '../option/option.service';
import { Option } from "../option/Option";

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  car: Car;
  options: Option[];

  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private optionService: OptionService
    ) { }

  ngOnInit(): void {
    this.resetCarDetails();
    this.getAllOptions();
  }
  
  resetCarDetails(): void {
    this.car = {
      id: 0,
      make: '',
      model: '',
      edition: '',
      price: null
    }
  }

  save(): void {
    this.carsService.saveCar(this.car)
    .subscribe(car => {this.car = car; this.viewCar()});
  }

  viewCar() {
    this.router.navigate([`/car/${this.car.id}`], { relativeTo: this.route });
  }

  getAllOptions() {
    this.optionService.getAllOptions().subscribe(o => {this.options = o;});
  }

}
