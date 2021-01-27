import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';

import { environment } from '../../environments/environment';
import { createTranslateLoader } from './classes/create-translate-loader.function';
import { MissingTranslationService } from './classes/missing-translation-service.class';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    SnackBarComponent,
    LanguageToggleComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService
      },
      defaultLanguage: environment.defaultLocale
    }),

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,

    SnackBarComponent,
    LanguageToggleComponent,
    FooterComponent,

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    TranslateStore
  ]
})
export class SharedModule {
}
