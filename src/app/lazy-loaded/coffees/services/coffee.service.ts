import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoffeesSearchParams } from '../interfaces/coffees-filter';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(
    private http: HttpClient,
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getCoffees(filter: CoffeesSearchParams): Observable<unknown> {
    return of(null)
  }
}
