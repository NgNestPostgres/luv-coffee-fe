import { TestBed } from '@angular/core/testing';

import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let service: ThemeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });

    service = TestBed.inject(ThemeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getClassNameForKey', () => {
    it('should return class name for the key', () => {
      const key = 'test-key';
      expect(service['getClassNameForKey'](key)).toBe(`style-manager-${key}`);
    });
  });

  describe('removeStyle', () => {
    beforeEach(() => {
      spyOn(document.head, 'removeChild');
    });

    it('should not call document.head.removeChild', () => {
      const key = 'test-theme-not-call-removeChild';
      service['removeStyle'](key);
      expect(document.head.removeChild).not.toHaveBeenCalled();
    });

    it('should call document.head.removeChild', () => {
      const key = 'test-theme-call-removeChild';
      service['createLinkElementWithKey'](key);
      service['removeStyle'](key);
      expect(document.head.removeChild).toHaveBeenCalled();
    });
  });

  describe('createLinkElementWithKey', () => {
    it('should create `HTMLLinkElement` with the key', () => {
      const key = 'test-theme-createLinkElementWithKey-create';
      const link: HTMLLinkElement = service['createLinkElementWithKey'](key);
      expect(link.className).toBe(`style-manager-${key}`);
      expect(link.rel).toBe('stylesheet');
    });
  });

  describe('getExistingLinkElementByKey', () => {
    it('should return `null`', () => {
      const key = 'test-theme-getExistingLinkElementByKey-null';
      expect(service['getExistingLinkElementByKey'](key)).toBe(null);
    });

    it('should return `HTMLLinkElement` by the key', () => {
      const key = 'test-theme-getExistingLinkElementByKey-key';
      const link: HTMLLinkElement = service['createLinkElementWithKey'](key);
      expect(service['getExistingLinkElementByKey'](key)).toBe(link);
    });
  });

  describe('getLinkElementForKey', () => {
    it('should return `HTMLLinkElement` for the key', () => {
      const key = 'test-theme-getLinkElementForKey-key';
      const link: HTMLLinkElement = service['getLinkElementForKey'](key);
      expect(link.className).toBe(`style-manager-${key}`);
    });
  });

  describe('getStoredTheme', () => {
    const key = 'test-project';

    afterEach(() => {
      service['localStorage'].clear();
    });

    it('should return undefined', () => {
      expect(service['getStoredTheme'](key)).toBe(undefined);
    });

    it('should return set theme', () => {
      const theme = 'dark';
      service['setStoredTheme'](theme, key);
      expect(service['getStoredTheme'](key)).toBe(theme);
    });
  });

  describe('setStoredTheme', () => {
    const key = 'test-project';
    const theme = 'dark';

    afterEach(() => {
      service['localStorage'].clear();
    });

    it('should return set theme', () => {
      service['setStoredTheme'](theme, key);
      expect(service['getStoredTheme'](key)).toBe(theme);
    });
  });

  describe('getPreferredTheme', () => {
    const key = 'test-project';

    afterEach(() => {
      service['localStorage'].clear();
    });

    it('should return dark theme', () => {
      const theme = 'dark';
      service['setStoredTheme'](theme, key);
      expect(service['getPreferredTheme'](key)).toBe(theme);
    });

    it('should return light theme', () => {
      service['_window'] = null;
      expect(service['getPreferredTheme'](key)).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should set dark theme', (done: DoneFn) => {
      service['setTheme']('dark');

      service.isDark$.subscribe((isDark) => {
        expect(isDark).toBe(true);
        done();
      });
    });

    it('should set light theme', (done: DoneFn) => {
      service['setTheme']('light');

      service.isDark$.subscribe((isDark) => {
        expect(isDark).toBe(false);
        done();
      });
    });
  });
});
