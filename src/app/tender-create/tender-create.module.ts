import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { TestAddressFormComponent } from './components/test-address-form/test-address-form.component';

const routes: Routes = [
  {path: '', component: TestAddressFormComponent},
];


@NgModule({
  declarations: [
    TestAddressFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class TenderCreateModule {
}
