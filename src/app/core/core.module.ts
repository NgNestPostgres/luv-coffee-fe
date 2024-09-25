import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptors } from './interceptors';

@NgModule({
  declarations: [],
  imports: [BrowserAnimationsModule],
  providers: [
    interceptors,
    provideHttpClient(withInterceptorsFromDi()),
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
