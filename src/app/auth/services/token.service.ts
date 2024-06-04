import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from '@core/services/storage.service';

const ACCESS_TOKEN = 'access_token';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    @Inject(LocalStorage) private localStorage: Storage
  ) { }

  public getAccessToken(): string {
    return 'QWERTY';
  }

  public setAccessToken(token: string) {
    this.localStorage.setItem(ACCESS_TOKEN, String(token));
  }
}
