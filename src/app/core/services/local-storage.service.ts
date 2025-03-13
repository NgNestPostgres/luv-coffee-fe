import {inject, Injectable, InjectionToken} from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable(
  {providedIn: 'root'},
)
export class LocalStorageService {
  private storage: Storage = inject(LOCAL_STORAGE);

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
