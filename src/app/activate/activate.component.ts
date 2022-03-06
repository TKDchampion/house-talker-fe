import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit {
  message = {
    title: '無效的連結',
    text: '',
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
    this.activate(this.token);
  }

  activate(token: string) {
    this.spinner.show();
    console.log(token);

    // this.authService.activate(token).subscribe(
    //   () => {
    //     this.message = {
    //       title: '驗證成功',
    //       text: '3秒鐘後自動跳到首頁',
    //     };
    //     this.spinner.hide();
    //   },
    //   () => {
    //     this.message = {
    //       title: '驗證失敗',
    //       text: '請通知管理員',
    //     };
    //     this.spinner.hide();
    //   }
    // );
  }
}
