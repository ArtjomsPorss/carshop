import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars/cars.service';
import { Location } from '@angular/common';
import { Car } from './Car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getCar();
  }

  car: Car;

  getCar() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
      .subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }

}
