import { Directive, ViewContainerRef, QueryList, ViewChildren, ContentChildren, AfterViewInit, AfterContentInit } from '@angular/core';
import { OptionComponent } from './option.component';

@Directive({
  selector: '[optionHost]'
})
export class OptionHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }


}
