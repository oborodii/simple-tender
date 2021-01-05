import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MyTableComponent } from './components/my-table/my-table.component';

const routes: Routes = [
  {path: '', component: MyTableComponent},
];


@NgModule({
  declarations: [
    MyTableComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TenderListModule {
}
