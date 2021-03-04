import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/interseptors/auth.interceptor';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};


@NgModule({
  declarations: [
    LayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AppRoutingModule,
    SharedModule
  ],
  providers: [
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule {
}
