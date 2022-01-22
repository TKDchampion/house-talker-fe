import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditCreateComponent } from './article-edit-create.component';

const routes: Routes = [{ path: '', component: ArticleEditCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleEditCreateRoutingModule {}
