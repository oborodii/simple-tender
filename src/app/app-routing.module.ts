import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { MyTableComponent } from './my-table/my-table.component';
import { TestAddressFormComponent } from './test-address-form/test-address-form.component';


const routes: Routes = [
  {path: '', component: MyTableComponent},
  {path: 'create', component: TestAddressFormComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
