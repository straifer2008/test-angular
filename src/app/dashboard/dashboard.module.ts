import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './view/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
