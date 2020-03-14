import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { Car } from './../car/Car';
import { CarHelper } from "../car/car-helper";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent extends CarHelper implements OnInit {

  carsService: CarsService;
  cars: Car[];

  constructor(carsService: CarsService) { 
    super();
    this.carsService = carsService;
  }

  ngOnInit(): void {
    this.showCars();
  }

  showCars() {
    this.carsService.getCars().subscribe((data: Car[]) => this.cars = data);
  }

}
