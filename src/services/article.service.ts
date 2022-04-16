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

  getArticleDetail(id: number): Observable<ArticleDetailInfo> {
    return this.get(`article/getDetailById/${id}`);
  }

  getAllNewsArticles(): Observable<ArticleInfo[]> {
    return this.get('article/getAllNews');
  }

  getArticleForUser(): Observable<ArticleInfo[]> {
    return this.get('article/getByUser');
  }

  createArticle(params: CreateArticleParams) {
    return this.post('article/create', {
      body: params,
    });
  }

  updateArticle(id: number, params: CreateArticleParams) {
    return this.patch(`article/update/${id}`, {
      body: params,
    });
  }

  deleteArticle(id: string) {
    return this.delete(`article/delete/${id}`);
  }
}

export interface CreateArticleParams {
  content: string;
  location: string;
  summaryContent: string;
  tips: string;
  title: string;
  isHiddenName: boolean;
}

export interface ArticleInfo {
  timeTw: string;
  summaryContent: string;
  location: string;
  id: string;
  userId: string;
  nickName: string;
  tips: string;
  title: string;
  replies: number;
  [key: string]: any;
}

export interface ArticleDetailInfo {
  timeTw: string;
  summaryContent: string;
  content: string;
  location: string;
  articleId: string;
  userId: string;
  nickName: string;
  tips: string;
  title: string;
}
