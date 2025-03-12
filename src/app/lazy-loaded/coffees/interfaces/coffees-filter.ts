import {Pagination} from '@core/interfaces/pagination';

export interface CoffeesFilter {
  brand: string;
  name: string;
  fromCreatedDate?: Date;
  toCreatedDate?: Date;
}

export type CoffeesSearchParams = Pagination & CoffeesFilter;
