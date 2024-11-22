import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TokenService } from '@auth/services/token.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const spyTokenService = jasmine.createSpyObj('TokenService', ['getAccessToken']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: TokenService, useValue: spyTokenService },
      ]
    });

    guard = TestBed.inject(AuthGuard);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('should be created', () => {
    expect(tokenServiceSpy.getAccessToken).not.toHaveBeenCalled();
    expect(guard).toBeTruthy();
  });
});
