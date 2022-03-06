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

  getArticleDetail(id: string): Observable<ArticleDetailInfo> {
    return this.get('getDetailsArticle', {
      queryObject: { articleId: id },
    });
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

  updateArticle(id: string, params: CreateArticleParams) {
    return this.put('updateArticle', {
      queryObject: { articleId: id },
      body: params,
    });
  }

  deleteArticle(id: string) {
    return this.delete('deleteArticle', {
      queryObject: { articleId: id },
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
  isHiddenName: boolean;
}

export interface ArticleInfo {
  time: string;
  summaryContent: string;
  location: string;
  articleId: string;
  userId: string;
  nickName: string;
  tips: string;
  title: string;
  countsComment: number;
  [key: string]: any;
}

export interface ArticleDetailInfo {
  time: string;
  summaryContent: string;
  content: string;
  location: string;
  articleId: string;
  userId: string;
  nickName: string;
  tips: string;
  title: string;
}
