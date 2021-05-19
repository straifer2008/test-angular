import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NavComponent} from './components/nav/nav.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class DashboardModule {
}
