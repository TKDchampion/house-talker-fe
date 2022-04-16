import { Router } from '@angular/router';
import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/services/storage.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() modalRef?: BsModalRef;
  articlesList: ArticleInfo[] = [];
  profile = {
    nickName: '',
    email: '',
    count: 0,
  };

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profile.nickName = this.storage.get('nickName') as any;
    this.profile.email = this.storage.get('email') as any;
    this.getArticleList();
  }

  getArticleList() {
    this.spinner.show();
    this.articleService.getArticleForUser().subscribe(
      (resp) => {
        this.articlesList = resp;
        this.articlesList.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
        this.profile.count = resp.length;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  createArticle() {
    this.router.navigate(['/app/article-page']);
    this.modalRef?.hide();
  }
}
