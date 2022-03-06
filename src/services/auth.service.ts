import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { Router } from '@angular/router';
import { ErrorServiceService } from 'src/app/core/services/error-service.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ErrorServiceService {
  constructor(
    http: HttpClient,
    options: HttpDefaultOptions,
    router: Router,
    storageService: StorageService
  ) {
    super(http, options, router, storageService);
  }

  login(param: LoginParam): Observable<LoginInfo> {
    return this.post('login', { body: param });
  }

  sign(param: SingParam) {
    return this.post('signUp', { body: param });
  }

  activate(token: string) {
    return this.post('activate', {
      queryObject: { token: token },
    });
  }
}

export interface SingParam {
  account: string;
  password: string;
  nickName: string;
}

export interface LoginParam {
  account: string;
  password: string;
}

export interface LoginInfo {
  access_token: string;
  account: string;
  nickName: string;
  token_type: string;
  userId: string;
}
