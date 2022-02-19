import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleDetailInfo,
  ArticleService,
} from 'src/services/article.service';
import {
  createMessageParam,
  MessageService,
  MessagesInfo,
} from 'src/services/message.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article?: ArticleDetailInfo;
  messages?: MessagesInfo[];
  inputMessage = '';
  nickName?: any;
  articleId = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id') as string;
    if (this.articleId) {
      this.getArticleDetail();
    }
    this.nickName = this.storage && this.storage.get('nickName');
  }

  getArticleDetail() {
    this.spinnerService.show();
    this.articleService.getArticleDetail(this.articleId).subscribe(
      (resp) => {
        this.article = resp;
        this.getMessageList();
      },
      (error) => {
        this.spinnerService.hide();
      }
    );
  }

  getMessageList() {
    this.messageService.getMessagesForUser(this.articleId).subscribe(
      (resp) => {
        this.messages = resp;
        this.messages.forEach(
          (i) => (i.isOwnMessage = i.nickName === this.nickName)
        );
        this.messages.sort((a, b) => (a.time > b.time ? -1 : 1));
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
      }
    );
  }

  createMessage() {
    const param: createMessageParam = {
      content: this.inputMessage,
      articleId: this.articleId,
    };
    this.spinnerService.show();
    this.messageService
      .createMessage(param)
      .subscribe(() => this.getMessageList());
  }
}
