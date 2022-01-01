import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonToolModule } from '../common/common-tool.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonToolModule,
    ModalModule.forRoot(),
  ],
})
export class PagesModule {}
