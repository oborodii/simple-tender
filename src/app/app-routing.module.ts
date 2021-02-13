import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: environment.router_list_url,
    pathMatch: 'full'
  },
  {
    path: environment.router_list_url,
    loadChildren: () => import('./tender-list-module/tender-list.module').then(m => m.TenderListModule)
  },
  {
    path: environment.router_create_url,
    loadChildren: () => import('./tender-create-module/tender-create.module').then(m => m.TenderCreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: environment.router_view_url,
    loadChildren: () => import('./tender-view-module/tender-view.module').then(m => m.TenderViewModule)
  },
  {
    path: environment.router_login_url,
    loadChildren: () => import('./login-module/login.module').then(m => m.LoginModule)
  },
  {
    path: environment.router_signup_url,
    loadChildren: () => import('./signup-module/signup.module').then(m => m.SignUpModule)
  },
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
