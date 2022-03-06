import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit {
  message = {
    title: '無效的連結',
    text: '',
    isSuccess: false,
  };
  token: any;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  ngOnInit(): void {
    this.token && this.activate(this.token);
  }

  activate(token: string) {
    this.spinner.show();

    this.authService.activate(token).subscribe(
      () => {
        this.message = {
          title: '驗證成功',
          text: '點選連結到首頁',
          isSuccess: true,
        };
        this.spinner.hide();
      },
      () => {
        this.message = {
          title: '驗證失敗',
          text: '請通知管理員',
          isSuccess: false,
        };
        this.spinner.hide();
      }
    );
  }
}
