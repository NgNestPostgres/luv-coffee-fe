import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

import { UserLogin, AccessTokenWrapped } from '@angularnestpostgre/packages/fe-shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
  ) { }

  public login(creds: UserLogin): Observable<string> {
    return this.http.post<AccessTokenWrapped>(`${environment.apiHost}/auth/login`,
        { ...creds }
      )
      .pipe(
        tap(token => this.tokenService.setAccessToken(token.data.accessToken)),
        map(token => token.data.accessToken),
        catchError(err => JSON.stringify(err))
      );
  }
}
