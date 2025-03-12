/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';

import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
