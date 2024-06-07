import {
  HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TokenService } from '@auth/services/token.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const spyTokenService = jasmine.createSpyObj('TokenService', ['getAccessToken']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: TokenService, useValue: spyTokenService },
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: AuthInterceptor
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('#getAccessToken should return stubbed value from a spy', () => {
    interface User {
      login: string
    }

    const dummyToken = 'TokenString';
    const dummyUsers: User[] = [
      { login: 'John' },
      { login: 'Doe' }
    ];

    tokenServiceSpy.getAccessToken.and.returnValue(dummyToken);

    client.get<User[]>('/test').subscribe((users: User[]) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);

      expect(tokenServiceSpy.getAccessToken.calls.count()).toBe(1);
      expect(tokenServiceSpy.getAccessToken.calls.mostRecent().returnValue)
        .toBe(dummyToken);
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
