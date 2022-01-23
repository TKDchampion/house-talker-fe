import { CommonToolModule } from 'src/app/common/common-tool.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [CommonModule, ArticleDetailRoutingModule, CommonToolModule],
})
export class ArticleDetailModule {}
