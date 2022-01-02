import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LoginInfo,
  LoginParam,
  LoginService,
} from 'src/services/login.service';
import { StorageService } from '../core/services/storage.service';

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
  isLogin = false;

  constructor(
    private modalService: BsModalService,
    private storage: StorageService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.isLogin = this.storage && this.storage.hasItem('access_token');
  }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onLoginSubmit() {
    this.errorMessage = this.loginForm.status === 'INVALID' ? '格式錯誤' : '';
    if (this.loginForm.status === 'VALID') {
      this.spinner.show();
      const param: LoginParam = this.loginForm.value;
      this.loginService.login(param).subscribe(
        (resp) => {
          this.setPersonal(resp);
          this.spinner.hide();
          this.modalRef?.hide();
        },
        (error) => {
          this.spinner.hide();
          this.isLogin = false;
          this.errorMessage = '帳密錯誤';
        }
      );
    }
  }

  logout() {
    this.storage.clear();
    this.isLogin = false;
  }

  private setPersonal(info: LoginInfo) {
    this.storage.set('access_token', info.access_token);
    this.storage.set('account', info.account);
    this.storage.set('nickName', info.nickName);
    this.storage.set('userId', info.userId);
    this.isLogin = true;
  }
}
