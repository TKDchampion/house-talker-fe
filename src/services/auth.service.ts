import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { Router } from '@angular/router';
import { ErrorServiceService } from 'src/app/core/services/error-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ErrorServiceService {
  constructor(http: HttpClient, options: HttpDefaultOptions, router: Router) {
    super(http, options, router);
  }

  login(param: LoginParam): Observable<LoginInfo> {
    return this.post('auth/login', { body: param });
  }

  sign(param: SingParam) {
    return this.post('auth/singup', { body: param });
  }

  activate(token: string) {
    return this.post('auth/activate', {
      queryObject: { token: token },
    });
  }
}

export interface SingParam {
  email: string;
  password: string;
  nickName: string;
}

export interface LoginParam {
  email: string;
  password: string;
}

export interface LoginInfo {
  access_token: string;
  email: string;
  nickName: string;
  userId: string;
}
