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

  public getCoffees(filter: CoffeesSearchParams): Observable<any> {
    return of(null)
  }
}
