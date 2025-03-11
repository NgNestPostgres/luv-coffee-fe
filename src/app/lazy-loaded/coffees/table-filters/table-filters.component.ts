import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, Output
} from '@angular/core';

import { CoffeesFilter } from '../interfaces/coffees-filter';

@Component({
  selector: 'anp-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFiltersComponent {
  @Input() widthPx: number | undefined;
  @Output() filtersChanged = new EventEmitter<CoffeesFilter>();
}
