import { NgModule } from '@angular/core';
import {AuthButtonComponent} from './components/auth-button/auth-button.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthButtonComponent,
  }
];

@NgModule({
  declarations: [
    AuthButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
