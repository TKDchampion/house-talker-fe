import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpDefaultOptions } from 'src/app/core/model/option';
import { ErrorServiceService } from 'src/app/core/services/error-service.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends ErrorServiceService {
  constructor(
    http: HttpClient,
    options: HttpDefaultOptions,
    router: Router,
    storageService: StorageService
  ) {
    super(http, options, router, storageService);
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

  updateMessage(id: string, param: createMessageParam) {
    return this.put('updateComment', {
      queryObject: { commentId: id },
      body: param,
    });
  }

  deleteMessage(id: string) {
    return this.delete('deleteComment', {
      queryObject: { commentId: id },
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
  [key: string]: unknown;
}
