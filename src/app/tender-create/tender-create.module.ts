import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TenderCreateRoutingModule } from './tender-create-routing.module';
import { TestAddressFormComponent } from './components/test-address-form/test-address-form.component';


@NgModule({
  declarations: [
    TestAddressFormComponent
  ],
  imports: [
    TenderCreateRoutingModule,
    SharedModule
  ],
  exports: []
})
export class TenderCreateModule {
}
