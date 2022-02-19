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

  getMessagesForUser(id: string): Observable<MessagesInfo[]> {
    return this.get('listComment', {
      queryObject: { articleId: id },
    });
  }

  createMessage(param: createMessageParam) {
    return this.post('createComment', {
      body: param,
    });
  }
}

export interface createMessageParam {
  content: string;
  articleId: string;
}

export interface MessagesInfo {
  content: string;
  userId: string;
  time: string;
  commentId: string;
  nickName: string;
  articleId: string;
  isOwnMessage?: boolean;
}
