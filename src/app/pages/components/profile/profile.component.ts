import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  articlesList: ArticleInfo[] = [];
  profile = {
    nickName: '',
    email: '',
    count: 0,
  };

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private storage: StorageService
  ) {
    this.getArticleList();
  }

  ngOnInit(): void {
    this.profile.nickName = this.storage.get('nickName') as any;
    this.profile.email = this.storage.get('account') as any;
  }

  getArticleList() {
    this.spinner.show();
    this.articleService.getArticleForUser().subscribe((resp) => {
      this.articlesList = resp;
      this.profile.count = resp.length;
      this.spinner.hide();
    });
  }
}
