import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthToken } from '../model/token';
import { JWTOptions } from '../model/option';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class JWTInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService, private options: JWTOptions) {
    // todo
    this.storage.set(
      'user',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyMzYyMTQ4LCJqdGkiOiJjYjE3MTNhYTFjMTY0NWQxOGIyZWU1ZTViZGUzNzg0NiIsInVzZXJfaWQiOjF9.c8deV_918lhoD3acPP9pqq7s4uE_LfL3x3bEi9W15Iw',
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: AuthToken = (!!this.options.key && this.storage.get(this.options.key)) || {};
    if (auth) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${auth}` } });
    }
    return next.handle(req);
  }
}
