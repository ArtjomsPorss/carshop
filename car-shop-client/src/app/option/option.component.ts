import { Component, OnInit } from '@angular/core';
import { Option } from "./Option";
import { OptionService } from './option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  added: boolean;
  selected: number;

  options: Option[];

  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.optionService.getAllOptions().subscribe(o => this.options = o);
  }

  select(selectedVal: any) {
    this.selected = selectedVal;
  }

  add() {
    this.added = true;
    // call directive to add another one, empty one
  }

  remove() {
    // call directive to delete this one
  }



}
