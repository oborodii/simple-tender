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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { createTranslateLoader } from './classes/create-translate-loader.function';

import { environment } from '../../environments/environment';
import { MissingTranslationService } from './classes/missing-translation-service.class';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatPaginatorNgxTranslateService } from '../services/mat-paginator-ngx-translate.service';
import { TimerComponent } from './components/timer/timer.component';


@NgModule({
  declarations: [
    LanguageToggleComponent,
    FooterComponent,
    TimerComponent
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
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,

    LanguageToggleComponent,
    FooterComponent,
    TimerComponent,

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
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [
    TranslateStore,
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorNgxTranslateService
    }
  ]
})
export class SharedModule {
}
