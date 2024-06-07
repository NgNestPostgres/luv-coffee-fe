import { TestBed } from '@angular/core/testing';
import { STORAGE_PROVIDERS } from '@core/services/storage.service';
import { windowProvider, WindowToken } from '@core/tokens/window';

import { TokenService } from './token.service';

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
