/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { HttpDefaultOptions, HttpRequestOptions } from '../model/option';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ErrorServiceService extends BaseService {
  constructor(
    http: HttpClient,
    options: HttpDefaultOptions,
    private router: Router
  ) {
    super(http, options);
  }

  get(url: string, httpOptions?: HttpRequestOptions): any {
    return super.get(url, httpOptions).pipe(this.handlerAuthError());
  }

  post(url: string, httpOptions?: HttpRequestOptions): any {
    return super.post(url, httpOptions).pipe(this.handlerAuthError());
  }

  patch(url: string, httpOptions?: HttpRequestOptions): any {
    return super.patch(url, httpOptions).pipe(this.handlerAuthError());
  }

  delete(url: string, httpOptions?: HttpRequestOptions): any {
    return super.delete(url, httpOptions).pipe(this.handlerAuthError());
  }

  private handlerAuthError(): OperatorFunction<unknown, unknown> {
    return catchError((e: HttpErrorResponse, caught) => {
      if (e.status === 401) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/app']);
        localStorage.clear();
        this.hideAll();
        return of();
      }
      throw e;
    });
  }

  private hideAll(): void {
    //try to hide all active modals
    const openModals = document.querySelectorAll('.modal.in');
    if (openModals) {
      for (let i = 0; i < openModals.length; i++) {
        //Get the modal-header of the modal
        const modalHeader =
          openModals[i].getElementsByClassName('modal-header');
        if (modalHeader && modalHeader.length > 0) {
          //Get the close button in the modal header
          const closeButton: any =
            modalHeader[0].getElementsByTagName('BUTTON');
          if (closeButton && closeButton.length > 0) {
            //simulate click on close button
            closeButton[0].click();
          }
        }
      }
    }
  }
}
