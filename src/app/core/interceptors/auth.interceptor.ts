import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {TokenService} from '@auth/services/token.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenService.getAccessToken();

    const credentialRequest = req.clone({
      withCredentials: true,
    });

    if (!accessToken) {
      return next.handle(credentialRequest);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next.handle(authReq);
  }
}
