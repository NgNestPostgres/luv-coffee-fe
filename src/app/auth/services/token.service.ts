import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from '@core/services/local-storage.service';

const ACCESS_TOKEN = 'access_token';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private localStorage = inject(LocalStorageService);

  public getAccessToken(): string | null {
    return this.localStorage.getItem(ACCESS_TOKEN);
  }

  public setAccessToken(token: string) {
    this.localStorage.setItem(ACCESS_TOKEN, token);
  }
}
