import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider } from '@angular/core';

import { AuthInterceptor } from './auth.interceptor';

export const interceptors: ClassProvider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
  }
];
