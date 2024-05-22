import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { STORAGE_PROVIDERS } from './services/storage.service';
import { WindowToken, windowProvider } from './tokens/window';

import { interceptors } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    interceptors,
    STORAGE_PROVIDERS,
    { provide: WindowToken, useFactory: windowProvider },
  ]
})
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
