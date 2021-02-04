import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { TenderListRoutingModule } from './tender-list-routing.module';
import { TenderTableComponent } from './components/tender-table/tender-table.component';


@NgModule({
  declarations: [
    TenderTableComponent
  ],
  imports: [
    TenderListRoutingModule,
    SharedModule,

    MatTableModule
  ]
})
export class TenderListModule {
}
