import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(http: HttpClient, options: HttpDefaultOptions) {
    super(http, options);
  }

  login(param: LoginParam): Observable<LoginInfo> {
    return this.post('login', { body: param });
  }

  sign(param: SingParam) {
    return this.post('signUp', { body: param });
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
