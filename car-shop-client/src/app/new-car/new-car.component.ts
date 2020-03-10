import { Component, OnInit } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  car: Car;

  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.resetCarDetails();
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

}
