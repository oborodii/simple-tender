import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TenderCreateRoutingModule } from './tender-create-routing.module';
import { CreateTenderFormComponent } from './components/create-tender-form/create-tender-form.component';


@NgModule({
  declarations: [
    CreateTenderFormComponent
  ],
  imports: [
    TenderCreateRoutingModule,
    SharedModule
  ],
  exports: []
})
export class TenderCreateModule {
}
