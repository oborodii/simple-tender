import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { TreeComponent } from './components/tree/tree.component';

const routes: Routes = [
  {path: '', component: TreeComponent}
];


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class TenderViewModule {
}
