import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TenderListRoutingModule } from './tender-list-routing.module';
import { TenderTableComponent } from './components/tender-table/tender-table.component';


@NgModule({
  declarations: [
    TenderTableComponent,
  ],
  imports: [
    TenderListRoutingModule,
    SharedModule
  ]
})
export class TenderListModule {
}
