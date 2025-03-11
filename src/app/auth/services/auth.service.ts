import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AccessTokenWrapped, UserLogin} from '@ngnestpostgres/fe-shared';
import {
  catchError, map, Observable, tap,
} from 'rxjs';
import {environment} from 'src/environments/environment';

import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
  ) { }

  public login(creds: UserLogin): Observable<string> {
    return this.http.post<AccessTokenWrapped>(
      `${environment.apiHost}/auth/login`,
      {...creds},
    )
      .pipe(
        tap((token: AccessTokenWrapped) => this.tokenService.setAccessToken(token.data.accessToken)),
        map((token: AccessTokenWrapped) => token.data.accessToken),
        catchError((err: Error) => JSON.stringify(err)),
      );
  }
}
