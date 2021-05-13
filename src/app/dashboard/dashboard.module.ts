import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NavComponent} from './components/nav/nav.component';
import {SharedModule} from '../shared/shared.module';
import {StatisticsComponent} from './view/statistics/statistics.component';
import {DashboardComponent} from './dashboard.component';
import { HomeComponent } from './view/home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    StatisticsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
