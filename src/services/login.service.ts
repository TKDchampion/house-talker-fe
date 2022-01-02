import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(http: HttpClient, options: HttpDefaultOptions) {
    super(http, options);
  }

  login(info: LoginParam): Observable<LoginInfo> {
    return this.post('login', { body: info });
  }
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
