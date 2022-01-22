import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditCreateComponent } from './article-edit-create.component';
import { ArticleEditCreateRoutingModule } from './article-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleEditCreateComponent],
  imports: [CommonModule, ArticleEditCreateRoutingModule, ReactiveFormsModule],
})
export class ArticleEditCreateModule {}
