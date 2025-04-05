import {TestBed} from '@angular/core/testing';

import {CoreService} from './core.service';
import {ThemeManagerService} from './theme-manager.service';

describe('CoreService', () => {
  let service: CoreService;
  let themeManagerServiceSpy: jasmine.SpyObj<ThemeManagerService>;

  beforeEach(() => {
    themeManagerServiceSpy = jasmine.createSpyObj('ThemeManagerService', ['init']);

    TestBed.configureTestingModule({
      providers: [
        {provide: ThemeManagerService, useValue: themeManagerServiceSpy},
      ],
    });
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initCoreServices', () => {
    it('should call init in themeManagerServiceSpy', () => {
      service.initCoreServices();
      expect(themeManagerServiceSpy.init).toHaveBeenCalled();
    });
  });
});
