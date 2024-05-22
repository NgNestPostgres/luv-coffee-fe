import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoffeesFilter } from '../interfaces/coffees-filter';

@Component({
  selector: 'anp-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent implements OnInit {
  @Input() widthPx: number | undefined;
  @Output() filtersChanged = new EventEmitter<CoffeesFilter>();

  constructor() { }

  ngOnInit(): void {
    console.log('TableFiltersComponent');
  }

}
