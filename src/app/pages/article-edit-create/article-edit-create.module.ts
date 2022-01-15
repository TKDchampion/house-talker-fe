import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditCreateComponent } from './article-edit-create.component';
import { ArticleEditCreateRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [ArticleEditCreateComponent],
  imports: [CommonModule, ArticleEditCreateRoutingModule],
})
export class ArticleEditCreateModule {}
