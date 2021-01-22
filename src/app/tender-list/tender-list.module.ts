import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { TenderListRoutingModule } from './tender-list-routing.module';
import { MyTableComponent } from './components/my-table/my-table.component';


@NgModule({
  declarations: [
    MyTableComponent
  ],
  imports: [
    TenderListRoutingModule,
    SharedModule,

    MatTableModule
  ]
})
export class TenderListModule {
}
