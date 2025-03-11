import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CoffeesFilter } from './interfaces/coffees-filter';
import { TableComponent } from './table/table.component';
import { TableFiltersComponent } from './table-filters/table-filters.component';

@Component({
  selector: 'anp-coffees',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableComponent,
    TableFiltersComponent
  ],
  template: `
    <anp-table-filters
      [widthPx]="filtersWidthPx"
      (filtersChanged)="changeFilters($event)"
    ></anp-table-filters>

    <anp-table
      [filters]="filters"
      (moduleWidth)="setFiltersWidth($event)"
    ></anp-table>
  `
})
export class CoffeesComponent {
  public filters: CoffeesFilter | undefined;
  public filtersWidthPx: number | undefined;

  public changeFilters(filters: CoffeesFilter): void {
    this.filters = filters;
  }

  public setFiltersWidth(tableWidthPx: number): void {
    this.filtersWidthPx = tableWidthPx;
  }
}
