import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LoginInfo,
  LoginParam,
  AuthService,
  SingParam,
} from 'src/services/auth.service';
import { StorageService } from '../core/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  modalRef?: BsModalRef;
  errorMessage = '';
  loginForm = this.formBuilder.group({
    account: ['', Validators.required],
    password: ['', Validators.required],
  });

  signForm = this.formBuilder.group({
    account: ['', Validators.required],
    password: ['', Validators.required],
    nickName: ['', Validators.required],
  });
  isLogin = false;

  constructor(
    private modalService: BsModalService,
    private storage: StorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.isLogin = this.storage && this.storage.hasItem('access_token');
  }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.errorMessage = '';
    this.modalRef = this.modalService.show(template);
  }

  logout() {
    this.storage.clear();
    this.isLogin = false;
    this.router.navigate(['app']);
  }

  onLoginSingSubmit(
    form: { status: string; value: LoginParam },
    isLogin: boolean
  ) {
    this.errorMessage = form.status === 'INVALID' ? '格式錯誤' : '';
    if (form.status === 'VALID') {
      this.spinner.show();
      isLogin ? this.login(form) : this.sign(form);
    }
  }

  private sign(form: { status?: string; value: any }) {
    const param: SingParam = form.value;
    this.authService.sign(param).subscribe(
      () => {
        console.log('Success!!');
        this.spinner.hide();
        this.modalRef?.hide();
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.spinner.hide();
        this.errorMessage =
          error.status === 403 ? error.error.message : '系統忙線';
      }
    );
  }

  private login(form: { status?: string; value: any }) {
    const param: LoginParam = form.value;
    this.authService.login(param).subscribe(
      (resp) => {
        this.setPersonal(resp);
        this.spinner.hide();
        this.modalRef?.hide();
      },
      () => {
        this.spinner.hide();
        this.isLogin = false;
        this.errorMessage = '帳密錯誤';
      }
    );
  }

  private setPersonal(info: LoginInfo) {
    this.storage.set('access_token', info.access_token);
    this.storage.set('account', info.account);
    this.storage.set('nickName', info.nickName);
    this.storage.set('userId', info.userId);
    this.isLogin = true;
  }
}
