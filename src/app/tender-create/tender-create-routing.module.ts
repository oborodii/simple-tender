import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTenderFormComponent } from './components/create-tender-form/create-tender-form.component';


const routes: Routes = [
  {path: '', component: CreateTenderFormComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TenderCreateRoutingModule {
}
