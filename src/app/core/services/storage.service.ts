import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get(key: string, type = 'localStorage'): Record<string, unknown> {
    return type === 'localStorage' ? JSON.parse(localStorage.getItem(key) as string) : JSON.parse(sessionStorage.getItem(key) as string);
  }

  set(key: string, obj: string, type = 'localStorage'): void {
    type === 'localStorage' ? localStorage.setItem(key, JSON.stringify(obj)) : sessionStorage.setItem(key, JSON.stringify(obj));
  }

  clear(type = 'localStorage'): void {
    type === 'localStorage' ? localStorage.clear() : sessionStorage.clear();
  }

  removeItem(key: string, type = 'localStorage'): void {
    type === 'localStorage' ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
  }

  hasItem(key: string, type = 'localStorage'): boolean {
    if (type === 'localStorage') {
      return localStorage.getItem(key) ? true : false;
    } else {
      return sessionStorage.getItem(key) ? true : false;
    }
  }
}
