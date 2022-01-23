import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { ErrorServiceService } from 'src/app/core/services/error-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends ErrorServiceService {
  constructor(http: HttpClient, options: HttpDefaultOptions, router: Router) {
    super(http, options, router);
  }

  getAllNewsArticles(): Observable<ArticleInfo[]> {
    return this.get('getAllNewsArticles');
  }

  getArticleForUser(): Observable<ArticleInfo[]> {
    return this.get('getArticeForUser');
  }

  createArticle(params: CreateArticleParams) {
    return this.post('createArticle', {
      body: params,
    });
  }
}

export interface CreateArticleParams {
  content: string;
  location: string;
  nickName: string;
  summaryContnet: string;
  tips: string;
  title: string;
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
