import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { Option } from "./Option";
import { OptionService } from './option.service';
import { NewCarComponent } from '../new-car/new-car.component';
import { OptionParent } from './option-parent';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output() addNew = new EventEmitter<any>();

  self: any;
  added: boolean = false;
  selectedOption: number;
  price: number;

  options: Option[];
  parent: OptionParent;

  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.optionService.getAllOptions().subscribe(o => this.options = o);
    // this.added = false;
  }

  select(selectedVal: any) {
    this.selectedOption = selectedVal;
  }

  add() {
    this.added = true;
    this.parent.addCarOption();
  }

  remove() {
    this.selectedOption = 0;
    this.added = false;
    this.self.destroy();
  }



}
