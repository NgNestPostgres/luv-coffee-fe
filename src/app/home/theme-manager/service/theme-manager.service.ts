/* eslint-disable no-underscore-dangle */
import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from '@core/services/local-storage.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {take} from 'rxjs/operators';

const LOCAL_STORAGE_KEY = 'anp-theme';

@Injectable({providedIn: 'root'})
export class ThemeManagerService {
  private document = inject(DOCUMENT);
  private localStorage = inject(LocalStorageService);
  private _isDarkSub = new BehaviorSubject(false);
  isDark$ = this._isDarkSub.asObservable();
  private _window = this.document.defaultView;

  constructor() {
    this.setTheme(this.getPreferredTheme());

    if (this._window?.matchMedia) {
      // This event is triggered when system mode is changed
      this._window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          const storedTheme = this.getStoredTheme();

          if (storedTheme !== 'light' && storedTheme !== 'dark') {
            this.setTheme(this.getPreferredTheme());
          }
        });
    }
  }

  private getStoredTheme = (key: string = LOCAL_STORAGE_KEY) => JSON.parse(this.localStorage.get(key) ?? '{}')
    .theme;

  private setStoredTheme = (theme: string, key: string = LOCAL_STORAGE_KEY) => {
    const meta = JSON.parse(this.localStorage.get(key) ?? '{}');
    meta.theme = theme;
    this.localStorage.set(key, JSON.stringify(meta));
  };

  private getPreferredTheme = (key: string = LOCAL_STORAGE_KEY): 'dark' | 'light' => {
    const storedTheme = this.getStoredTheme(key);

    if (storedTheme) {
      return storedTheme;
    }

    if (this._window?.matchMedia) {
      return this._window.matchMedia('(prefers-color-scheme: dark)').matches ?
        'dark' :
        'light';
    }

    return 'light';
  };

  private setTheme = (theme: string) => {
    if (this._window?.matchMedia) {
      if (
        theme === 'auto' &&
        this._window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.document.documentElement.setAttribute('data-bs-theme', 'dark');
        this._isDarkSub.next(true);
      } else {
        this.document.documentElement.setAttribute('data-bs-theme', theme);
        this._isDarkSub.next(theme === 'dark');
      }

      this.setMaterialTheme();
    }
  };

  private setMaterialTheme() {
    this.isDark$.pipe(take(1)).subscribe((isDark: boolean) => {
      if (isDark) {
        const href = 'dark-theme.css';
        this.getLinkElementForKey('dark-theme').setAttribute('href', href);
        this.document.documentElement.classList.add('dark-theme');
      } else {
        this.removeStyle('dark-theme');
        this.document.documentElement.classList.remove('dark-theme');
      }
    });
  }

  private removeStyle(key: string): void {
    const existingLinkElement = this.getExistingLinkElementByKey(key);

    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string): HTMLLinkElement {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string): HTMLLinkElement | null {
    return this.document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`,
    );
  }

  private createLinkElementWithKey(key: string): HTMLLinkElement {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    this.document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string): string {
    return `style-manager-${key}`;
  }

  public changeTheme(theme: string): void {
    this.setStoredTheme(theme);
    this.setTheme(theme);
  }
}
