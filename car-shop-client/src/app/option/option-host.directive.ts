import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[option-host]'
})
export class OptionHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
