import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Option } from "./Option";
import { OptionService } from './option.service';
import { NewCarComponent } from '../new-car/new-car.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output() addNew = new EventEmitter<any>();

  self: any;
  added: boolean;
  selected: number;

  options: Option[];
  parent: NewCarComponent;

  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.optionService.getAllOptions().subscribe(o => this.options = o);
    this.added = false;
  }

  select(selectedVal: any) {
    this.selected = selectedVal;
  }

  add() {
    this.added = true;
    // call directive to add another one, empty one
    // console.log('add()');
    // this.addNew.emit(true);
    this.parent.addCarOption();
  }

  // check for display of Add and Remove buttons
  notAdded(): boolean {
    return this.added === false;
  }
  isAdded(): boolean {
    return  this.added === true;
  }

  remove() {
    this.self.destroy();
  }



}
