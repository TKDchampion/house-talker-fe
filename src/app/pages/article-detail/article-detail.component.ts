import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleDetailInfo,
  ArticleService,
} from 'src/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article?: ArticleDetailInfo;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id') as string;
    this.getArticleDetail(articleId);
  }

  getArticleDetail(id: string) {
    if (id) {
      this.spinnerService.show();
      this.articleService.getArticleDetail(id).subscribe(
        (resp) => {
          this.article = resp;
          this.spinnerService.hide();
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
    }
  }
}
