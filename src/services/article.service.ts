import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseService {
  constructor(http: HttpClient, options: HttpDefaultOptions) {
    super(http, options);
  }

  getAllNewsArticles(): Observable<ArticleInfo[]> {
    return this.get('getAllNewsArticles');
  }
}

export interface ArticleInfo {
  time: string;
  summaryContnet: string;
  location: string;
  articleId: string;
  userId: string;
  nickName: string;
  tips: string;
  title: string;
}
