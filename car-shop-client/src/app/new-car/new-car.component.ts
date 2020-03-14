import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewRef, ViewChildren, QueryList, ContentChildren, ElementRef, ViewContainerRef, ContentChild } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionHostDirective } from '../option/option-host.directive';
import { OptionComponent } from '../option/option.component';
import { OptionParent } from '../option/option-parent';
import { CarHelper } from '../car/car-helper';
import { OptionService } from '../option/option.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent extends CarHelper  implements OnInit, OptionParent {

  car: Car;
  childrenOptions: OptionComponent[] = [];
  @ViewChild(OptionHostDirective, {static: true}) optionHost: OptionHostDirective;
  
  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    optionService: OptionService
    ) { 
      super(optionService);
    }

  ngOnInit(): void {
    this.resetCarDetails();
    this.addCarOption();
    
  }

  save(): void {
    this.pickSelectedOptions();
    this.carsService.saveCar(this.car)
    .subscribe(car => {this.car = car; this.viewCar()});
  }
  pickSelectedOptions() {
    this.car.selectedOptions = this.childrenOptions.filter(o => o.selectedOption !== 0 && o.added).map(o => { return{carId: this.car.id, price:o.price, selectedOption: o.selectedOption}});
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
    this.childrenOptions.push(componentRef.instance);
  }

  addNewFromChild(event: any) {
    console.log('addNewFromChild()');
    this.addCarOption();
  }

}
