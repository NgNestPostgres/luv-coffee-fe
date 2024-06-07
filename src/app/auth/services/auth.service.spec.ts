import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpMock: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const spyTokenService = jasmine.createSpyObj('TokenService', ['getAccessToken']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: TokenService, useValue: spyTokenService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('should be created', () => {
    expect(tokenServiceSpy.getAccessToken).not.toHaveBeenCalled();
    expect(service).toBeTruthy();
  });
});
