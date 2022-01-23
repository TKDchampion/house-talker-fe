import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'article-page',
        loadChildren: () =>
          import('./article-edit-create/article-edit-create.module').then(
            (m) => m.ArticleEditCreateModule
          ),
      },
      {
        path: 'article-detail',
        loadChildren: () =>
          import('./article-detail/article-detail.module').then(
            (m) => m.ArticleDetailModule
          ),
      },
      {
        path: 'article-detail/:id',
        loadChildren: () =>
          import('./article-detail/article-detail.module').then(
            (m) => m.ArticleDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
