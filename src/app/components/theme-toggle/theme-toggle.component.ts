import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorage } from '@core/services/storage.service';

const STORAGE_KEY = 'anp-theme';

enum ThemeNames {
  Dark = 'dark',
  Light = 'light',
}

@Component({
  selector: 'anp-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  public isDark = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LocalStorage) private localStorage: Storage
  ) { }

  ngOnInit(): void {
    this.initializeThemeFromPreferences();
  }

  public  getThemeName(): string {
    return this.isDark ? ThemeNames.Dark : ThemeNames.Light;
  }

  public getToggleLabel(): string {
    return `Switch to ${this.isDark ? ThemeNames.Light : ThemeNames.Dark} mode`;
  }

  public toggleTheme(): void {
    const prevTheme = `${this.getThemeName()}-theme`;
    this.isDark = !this.isDark;
    const currentTheme = `${this.getThemeName()}-theme`;

    this.updateBodyClass(prevTheme, currentTheme);
    this.updateRenderedTheme();
  }

  private initializeThemeFromPreferences(): void {
    const storedPreference = this.localStorage.getItem(STORAGE_KEY);

    // If we do have a preference in localStorage, use that. Otherwise,
    // initialize based on the prefers-color-scheme media query.
    if (storedPreference) {
      this.isDark = storedPreference === 'true';
    } else {
      this.isDark = matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }

    const initialTheme = this.document.querySelector('#anp-initial-theme');

    if (initialTheme) {
      initialTheme.remove();
    }

    this.document.body.classList.add(`${this.getThemeName()}-theme`);

    const themeLink = this.document.createElement('link');
    themeLink.id = 'anp-custom-theme';
    themeLink.rel = 'stylesheet';
    themeLink.href = `${this.getThemeName()}-theme.css`;
    this.document.head.appendChild(themeLink);
  }

  private updateBodyClass(prevTheme: string, currentTheme: string): void {
    this.document.body.classList.replace(prevTheme, currentTheme);
  }

  private updateRenderedTheme(): void {
    const customLinkElement = this.document.getElementById('anp-custom-theme') as HTMLLinkElement | null;

    if (customLinkElement) {
      customLinkElement.href = `${this.getThemeName()}-theme.css`;
    }

    this.localStorage.setItem(STORAGE_KEY, String(this.isDark));
  }
}
