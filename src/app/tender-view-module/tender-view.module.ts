import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TenderViewRoutingModule } from './tender-view-routing.module';
import { SelectedTenderComponent } from './components/selected-tender/selected-tender.component';
import { BetCreateComponent } from './components/bet-create/bet-create.component';
import { BestBetComponent } from './components/best-bet/best-bet.component';
import { BetTableComponent } from './components/bet-table/bet-table.component';


@NgModule({
  declarations: [
    SelectedTenderComponent,
    BetCreateComponent,
    BestBetComponent,
    BetTableComponent
  ],
  imports: [
    TenderViewRoutingModule,
    SharedModule
  ],
  exports: []
})
export class TenderViewModule {
}
