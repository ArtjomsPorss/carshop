import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { Car } from './../car/Car';
import { CarHelper } from "../car/car-helper";
import { OptionService } from '../option/option.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent extends CarHelper implements OnInit {

  cars: Car[];

  constructor(
    private carsService: CarsService,
    optionService: OptionService
    ) { 
    super(optionService);
  }

  ngOnInit(): void {
    this.showCars();
  }

  showCars() {
    this.carsService.getCars().subscribe((data: Car[]) => this.cars = data);
  }

}
