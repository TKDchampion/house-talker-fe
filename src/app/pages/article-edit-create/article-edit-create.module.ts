import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditCreateComponent } from './article-edit-create.component';
import { ArticleEditCreateRoutingModule } from './article-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommonToolModule } from 'src/app/common/common-tool.module';

@NgModule({
  declarations: [ArticleEditCreateComponent],
  imports: [
    CommonModule,
    ArticleEditCreateRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    CommonToolModule,
  ],
})
export class ArticleEditCreateModule {}
