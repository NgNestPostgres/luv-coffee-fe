import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

import {CoffeesFilter} from '../interfaces/coffees-filter';
import {CoffeeService} from '../services/coffee.service';

@Component({
  selector: 'anp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() filters: CoffeesFilter | undefined;
  @Output() moduleWidth = new EventEmitter<number>();

  constructor(
    private coffeeService: CoffeeService,
  ) { }

  ngOnInit(): void {
    console.log('TableComponent');
  }
}
