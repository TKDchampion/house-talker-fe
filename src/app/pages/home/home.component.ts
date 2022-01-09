import { Component, OnInit } from '@angular/core';
import { ArticleInfo, ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articlesList: ArticleInfo[] = [];
  constructor(private articleService: ArticleService) {
    this.getArticlesList();
  }

  ngOnInit(): void {}

  getArticlesList() {
    this.articleService
      .getAllNewsArticles()
      .subscribe((resp: ArticleInfo[]) => {
        this.articlesList = resp;
      });
  }
}
