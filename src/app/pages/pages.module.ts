import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonToolModule } from '../common/common-tool.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [PagesComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonToolModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class PagesModule {}
