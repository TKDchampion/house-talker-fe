import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() setting?: ArticleInfo;
  @Input() isControlBtn = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private articleService: ArticleService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  updateGo(articleId?: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/app/article-page/${articleId}`]);
    this.modalService.hide();
  }

  deleteBtn(articleId?: string) {
    if (articleId) {
      this.spinnerService.show();
      this.articleService.deleteArticle(articleId).subscribe(
        () => {
          this.modalService.hide();
          this.spinnerService.hide();
        },
        () => this.spinnerService.hide()
      );
    }
  }
}
