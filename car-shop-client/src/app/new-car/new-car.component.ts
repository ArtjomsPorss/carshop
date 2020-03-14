import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewRef, ViewChildren, QueryList, ContentChildren, ElementRef, ViewContainerRef, ContentChild } from '@angular/core';
import { Car } from '../car/Car';
import { CarsService } from '../cars/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionService } from '../option/option.service';
import { Option } from "../option/Option";
import { OptionHostDirective } from '../option/option-host.directive';
import { OptionComponent } from '../option/option.component';
import { SelectedOption } from "../option/selected-option";

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  car: Car;
  selectedOptions: SelectedOption[];
  childrenOptions: OptionComponent[] = [];
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
      price: null,
      selectedOptions: []
    }
  }

  save(): void {
    this.pickSelectedOptions();
    this.carsService.saveCar(this.car)
    .subscribe(car => {this.car = car; this.viewCar()});
  }
  pickSelectedOptions() {
    var selectedOptions: SelectedOption[] =  this.childrenOptions.filter(o => o.selectedOption !== 0 && o.isAdded()).map(o => { return{carId: this.car.id, price:o.price, selectedOption: o.selectedOption}});
    this.car.selectedOptions = selectedOptions;   
    console.log(this.selectedOptions);
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
