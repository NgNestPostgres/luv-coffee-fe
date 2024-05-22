import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

import { STORAGE_PROVIDERS } from '@core/services/storage.service';
import { WindowToken, windowProvider } from '@core/tokens/window';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        STORAGE_PROVIDERS,
        { provide: WindowToken, useFactory: windowProvider },
      ],
    });

    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
