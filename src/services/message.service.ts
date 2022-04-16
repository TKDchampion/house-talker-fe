import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { ErrorServiceService } from 'src/app/core/services/error-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends ErrorServiceService {
  constructor(http: HttpClient, options: HttpDefaultOptions, router: Router) {
    super(http, options, router);
  }

  getListByArticle(id: number): Observable<MessagesInfo[]> {
    return this.get(`comment/getListByArticle/${id}`);
  }

  createMessage(param: createMessageParam) {
    return this.post('comment/create', {
      body: param,
    });
  }

  updateMessage(id: number, param: updateMessageParam) {
    return this.patch(`comment/update/${id}`, {
      body: param,
    });
  }

  deleteMessage(id: number) {
    return this.delete(`comment/delete/${id}`);
  }
}

export interface createMessageParam {
  content: string;
  articleId: number;
  isHiddenName: boolean;
}

export interface updateMessageParam {
  content: string;
  isHiddenName: boolean;
}

export interface MessagesInfo {
  content: string;
  userId: number;
  timeTw: string;
  id: number;
  nickName: string;
  articleId: number;
  isOwnMessage?: boolean;
  isHiddenName: boolean;
  [key: string]: unknown;
}
