/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpDefaultOptions, HttpRequestOptions } from '../model/option';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorServiceService extends BaseService {
  constructor(
    http: HttpClient,
    options: HttpDefaultOptions,
    private router: Router,
    private storageService: StorageService
  ) {
    super(http, options);
  }

  get(url: string, httpOptions?: HttpRequestOptions): any {
    return super.get(url, httpOptions).pipe(this.handlerAuthError());
  }

  post(url: string, httpOptions?: HttpRequestOptions): any {
    return super.post(url, httpOptions).pipe(this.handlerAuthError());
  }

  put(url: string, httpOptions?: HttpRequestOptions): any {
    return super.put(url, httpOptions).pipe(this.handlerAuthError());
  }

  delete(url: string, httpOptions?: HttpRequestOptions): any {
    return super.delete(url, httpOptions).pipe(this.handlerAuthError());
  }

  private handlerAuthError(): OperatorFunction<unknown, unknown> {
    return catchError((e: HttpErrorResponse, caught) => {
      if (e.status === 401) {
        location.reload();
        this.router.navigate(['/app']);
        this.storageService.clear();
        return of();
      }
      throw e;
    });
  }
}
