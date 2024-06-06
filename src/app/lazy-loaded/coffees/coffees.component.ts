import { Component } from '@angular/core';

import { CoffeesFilter } from './interfaces/coffees-filter';

@Component({
  selector: 'anp-coffees',
  styles: [''],
  template: `
    <anp-table-filters
      [widthPx]="filtersWidthPx"
      (filtersChanged)="changeFilters($event)"
    ></anp-table-filters>

    <anp-table
      [filters]="filters"
      (moduleWidth)="setFiltersWidth($event)"
    ></anp-table>
  `,
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
