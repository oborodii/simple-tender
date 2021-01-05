import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTableComponent } from './components/my-table/my-table.component';


const routes: Routes = [
  {path: '', component: MyTableComponent},
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
