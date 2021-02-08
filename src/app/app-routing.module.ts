import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', loadChildren: () => import('./tender-list/tender-list.module').then(m => m.TenderListModule)},
  {
    path: 'create', loadChildren: () => import('./tender-create/tender-create.module').then(m => m.TenderCreateModule),
    canActivate: [AuthGuard]
  },
  {path: 'view', loadChildren: () => import('./tender-view/tender-view.module').then(m => m.TenderViewModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignUpModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
