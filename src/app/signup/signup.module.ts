import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../shared/shared.module';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SharedModule,
    SignUpRoutingModule,

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
  ]
})
export class SignUpModule {
}
