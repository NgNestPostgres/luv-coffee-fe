import { NgModule, Optional, SkipSelf } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { STORAGE_PROVIDERS } from './services/storage.service';
import { WindowToken, windowProvider } from './tokens/window';

import { interceptors } from './interceptors';


@NgModule({ declarations: [], imports: [BrowserAnimationsModule], providers: [
        interceptors,
        STORAGE_PROVIDERS,
        { provide: WindowToken, useFactory: windowProvider },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: CoreModule
  ) {
    if (parent) {
      throw new Error('This module maybe included only in AppModule');
    }
  }
}
