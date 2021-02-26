import { NgModule } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SharedModule } from '../shared/shared.module';
import { TenderCreateRoutingModule } from './tender-create-routing.module';
import { CreateTenderFormComponent } from './components/create-tender-form/create-tender-form.component';


@NgModule({
  declarations: [
    CreateTenderFormComponent
  ],
  imports: [
    TenderCreateRoutingModule,
    SharedModule,

    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [],
  providers: [
    MatDatepickerModule
  ]
})
export class TenderCreateModule {
}
