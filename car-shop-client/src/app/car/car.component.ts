import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../cars/cars.service';
import { Location } from '@angular/common';
import { Car } from './Car';
import { CarHelper } from "./car-helper";


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent extends CarHelper implements OnInit {

  car: Car;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private location: Location,
    private router: Router
    ) { 
      super();
    }

  ngOnInit(): void {
    this.getCar();
  }


  getCar() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
      .subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }

  edit(): void {
    this.editing = true;
  }
  finishEditing(): void {
    this.editing = false;
  }

  updateEdits(): void {
    console.info("update edits is called");
    this.finishEditing();
    this.carsService.updateCarDetails(this.car)
      .subscribe(article => {console.log(article)});
  }

  delete(): void {
    this.carsService.deleteCar(this.car).subscribe(e => { this.goToCars(); });
  }

  goToCars() {
    this.router.navigate(['/cars'], { relativeTo: this.route });
  }
}
