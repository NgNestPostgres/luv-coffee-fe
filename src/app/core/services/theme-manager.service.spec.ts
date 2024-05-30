import { TestBed } from '@angular/core/testing';

import { STORAGE_PROVIDERS } from '@core/services/storage.service';
import { WindowToken, windowProvider } from '@core/tokens/window';
import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let service: ThemeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        STORAGE_PROVIDERS,
        { provide: WindowToken, useFactory: windowProvider },
      ]
    });
    service = TestBed.inject(ThemeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
