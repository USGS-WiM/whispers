import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.scss']
})
export class ChiplistComponent implements OnInit {

  @Input() items: any[];
  @Input() join = "";
  @Input() nameProp = "name";
  @Input() maxItems: number = undefined;
  @Output() removed = new EventEmitter();
  @Output() moreClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
