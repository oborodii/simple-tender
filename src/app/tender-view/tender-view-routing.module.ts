import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedTenderComponent } from './components/selected-tender/selected-tender.component';


const routes: Routes = [
  {path: '', redirectTo: '0', pathMatch: 'full'},
  {path: ':id', component: SelectedTenderComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TenderViewRoutingModule {
}
