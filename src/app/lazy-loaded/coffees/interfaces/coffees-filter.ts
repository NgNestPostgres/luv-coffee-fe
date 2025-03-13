import {Pagination} from '@core/interfaces/pagination.interface';

export interface CoffeesFilter {
  brand: string;
  name: string;
  fromCreatedDate?: Date;
  toCreatedDate?: Date;
}

export type CoffeesSearchParams = Pagination & CoffeesFilter;
