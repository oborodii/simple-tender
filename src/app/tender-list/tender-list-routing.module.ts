import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenderTableComponent } from './components/tender-table/tender-table.component';


const routes: Routes = [
  {path: '', component: TenderTableComponent},
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TenderListRoutingModule {
}
