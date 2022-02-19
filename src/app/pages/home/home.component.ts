import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articlesList: ArticleInfo[] = [];
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.getArticlesList();
  }

  ngOnInit(): void {}

  getArticlesList() {
    this.spinner.show();
    this.articleService.getAllNewsArticles().subscribe(
      (resp: ArticleInfo[]) => {
        this.articlesList = resp;
        this.articlesList.sort((a, b) => (a.time > b.time ? -1 : 1));
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  goDetailArticle(item: ArticleInfo) {
    this.router.navigate([`/app/article-detail/${item.articleId}`]);
  }
}
