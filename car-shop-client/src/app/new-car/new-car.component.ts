import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionService } from '../option/option.service';
import { Option } from "../option/Option";
import { OptionHostDirective } from '../option/option-host.directive';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  car: Car;
  selectedOptions: Option[];
  @ViewChild(OptionHostDirective, {static: true}) optionHost: OptionHostDirective;

  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit(): void {
    this.resetCarDetails();
    this.addCarOption();
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

  addCarOption() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OptionComponent);
    const viewContainerRef = this.optionHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // assigning it back to itself for destroy method
    componentRef.instance.self = componentRef;
    componentRef.instance.parent = this;
  }

  addNewFromChild(event: any) {
    console.log('addNewFromChild()');
    this.addCarOption();
  }

}
