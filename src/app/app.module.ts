import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpDefaultOptions, JWTOptions } from './core/model/option';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './core/interceptor/jwt-interceptor';

export class DKSHitHttpDefaultOptions extends HttpDefaultOptions {
  baseApiURL = environment.baseApiUrl; // input api base url.
}

export class DKSHJWTOptions extends JWTOptions {
  key = 'user';
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    { provide: HttpDefaultOptions, useClass: DKSHitHttpDefaultOptions },
    { provide: JWTOptions, useClass: DKSHJWTOptions },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
