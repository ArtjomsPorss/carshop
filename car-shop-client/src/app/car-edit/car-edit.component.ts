import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CarsService } from '../cars/cars.service';
import { CarHelper } from '../car/car-helper';
import { OptionService } from '../option/option.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../car/car';
import { OptionHostDirective } from '../option/option-host.directive';
import { OptionComponent } from '../option/option.component';
import { OptionParent } from '../option/option-parent';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent extends CarHelper implements OnInit, OptionParent {

  @ViewChild(OptionHostDirective, {static: true}) optionHost: OptionHostDirective;

  childrenOptions: OptionComponent[] = [];

  constructor(optionService: OptionService,
    private router: Router,
    private route: ActivatedRoute,
    private carsService: CarsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(optionService);
   }

  ngOnInit(): void {
    this.resetCarDetails();
    this.getCar();
  }


  getCar() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
      .subscribe(car => { this.car = car; this.displayCarOptions()});
  }

  displayCarOptions() {
    this.car.selectedOptions.forEach((option) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OptionComponent);
      const viewContainerRef = this.optionHost.viewContainerRef;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      // assigning it back to itself for destroy method
      componentRef.instance.self = componentRef;
      componentRef.instance.parent = this;
      componentRef.instance.added = true;
      componentRef.instance.price = option.price;
      componentRef.instance.selectedOption = option.selectedOption;
      this.childrenOptions.push(componentRef.instance);
    });
    // add last one at the end
    this.addCarOption();  
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
    
  updateEdits(): void {
    this.pickSelectedOptions();  
    this.carsService.updateCarDetails(this.car)
      .subscribe(retVal => this.viewCar());
  }

  viewCar() {
    this.router.navigate([`/car/${this.car.id}`], { relativeTo: this.route });
  }

  pickSelectedOptions() {
    this.car.selectedOptions = this.childrenOptions.filter(o => o.selectedOption !== 0 && o.added).map(o => { return{carId: this.car.id, price:o.price, selectedOption: o.selectedOption}});
  }

}
