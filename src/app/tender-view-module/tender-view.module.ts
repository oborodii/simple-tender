import { NgModule } from '@angular/core';

import { MatTreeModule } from '@angular/material/tree';

import { SharedModule } from '../shared/shared.module';
import { TenderViewRoutingModule } from './tender-view-routing.module';
import { TreeComponent } from './components/tree/tree.component';
import { SelectedTenderComponent } from './components/selected-tender/selected-tender.component';
import { BetCreateComponent } from './components/bet-create/bet-create.component';


@NgModule({
  declarations: [
    TreeComponent,
    SelectedTenderComponent,
    BetCreateComponent
  ],
  imports: [
    TenderViewRoutingModule,
    SharedModule,

    MatTreeModule
  ],
  exports: []
})
export class TenderViewModule {
}
