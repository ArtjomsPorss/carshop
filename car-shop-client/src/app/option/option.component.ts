import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ContentChildren } from '@angular/core';
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
  selectedOption: number;
  price: number;

  options: Option[];
  parent: NewCarComponent;

  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.optionService.getAllOptions().subscribe(o => this.options = o);
    this.added = false;
  }

  select(selectedVal: any) {
    this.selectedOption = selectedVal;
  }

  add() {
    this.added = true;
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
    this.selectedOption = 0;
    this.added = false;
    this.self.destroy();
  }



}
