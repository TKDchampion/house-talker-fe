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
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article?: ArticleDetailInfo;
  messages?: MessagesInfo[];
  inputMessage = '';
  userId?: any;
  articleId = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private storage: StorageService,
    private tagService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id') as string;
    if (this.articleId) {
      this.getArticleDetail();
    }
    this.userId = this.storage && this.storage.get('userId');
  }

  addSEO(data: ArticleDetailInfo) {
    this.titleService.setTitle(data.title);
    this.tagService.addTag({
      name: 'description',
      content: data.summaryContent,
    });
    this.tagService.addTag({
      property: 'og:description',
      content: data.summaryContent,
    });
    this.tagService.addTag({
      property: 'og:title',
      content: data.title,
    });
    this.tagService.addTag({
      property: 'og:image',
      content:
        'https://www.maxpixel.net/static/photo/1x/House-Illustration-Exterior-Two-Floors-House-House-4921836.jpg',
    });
  }

  getArticleDetail() {
    this.spinnerService.show();
    this.articleService.getArticleDetail(this.articleId).subscribe(
      (resp) => {
        this.article = resp;
        this.addSEO(resp);
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
        this.messages.sort((a, b) => (a.time > b.time ? -1 : 1));
        this.messages.forEach(
          (i) => (i.isOwnMessage = i.userId === this.userId)
        );
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
    this.messageService.createMessage(param).subscribe(() => {
      this.inputMessage = '';
      this.getMessageList();
    });
  }

  updataMessage(item: MessagesInfo) {
    if (item.openState) {
      this.spinnerService.show();
      const param: createMessageParam = {
        content: item.content,
        articleId: this.articleId,
      };
      this.messageService.updateMessage(item.commentId, param).subscribe(
        () => {
          item.openState = false;
          this.getMessageList();
        },
        () => this.spinnerService.hide()
      );
    } else {
      item.openState = true;
    }
  }

  cancelMessage(item: MessagesInfo) {
    item.openState = false;
  }

  deleteMessage(item: MessagesInfo) {
    this.spinnerService.show();
    this.messageService.deleteMessage(item.commentId).subscribe(
      () => {
        this.getMessageList();
      },
      () => this.spinnerService.hide
    );
  }
}
