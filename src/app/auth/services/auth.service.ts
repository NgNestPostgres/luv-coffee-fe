import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessToken, ApiResp, AuthStateQuery, UserLogin, UserRole } from '@ngnestpostgres/fe-shared';
import {
  catchError, map, Observable, tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
  ) { }

  getAuthState(query: AuthStateQuery): Observable<UserRole | null> {
    let params = new HttpParams();

    if (query.phone) {
      params = params.append('phone', query.phone);
    }

    if (query.email) {
      params = params.append('email', query.email);
    }

    return this.http.get<ApiResp<UserRole | null>>(
      `${environment.apiHost}/auth/auth-state`,
      { params },
    )
      .pipe(
        map((resp: ApiResp<UserRole | null>) => resp.data),
      );
  }

  login(creds: UserLogin): Observable<string> {
    return this.http.post<ApiResp<AccessToken>>(
      `${environment.apiHost}/auth/login`,
      { ...creds },
    )
      .pipe(
        tap((resp: ApiResp<AccessToken>) => this.tokenService.setAccessToken(resp.data.accessToken)),
        map((resp: ApiResp<AccessToken>) => resp.data.accessToken),
        catchError((err: Error) => JSON.stringify(err)),
      );
  }
}
