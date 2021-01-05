import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestAddressFormComponent } from './components/test-address-form/test-address-form.component';


const routes: Routes = [
  {path: '', component: TestAddressFormComponent}
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
