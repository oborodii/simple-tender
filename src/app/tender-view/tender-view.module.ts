import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TenderViewRoutingModule } from './tender-view-routing.module';
import { TreeComponent } from './components/tree/tree.component';


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    TenderViewRoutingModule,
    SharedModule
  ],
  exports: []
})
export class TenderViewModule {
}
