import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NavComponent} from './components/nav/nav.component';
import {SharedModule} from '../shared/shared.module';
import {StatisticsComponent} from './view/statistics/statistics.component';
import {DashboardComponent} from './dashboard.component';
import { HomeComponent } from './view/home/home.component';
import { SettingsComponent } from './view/settings/settings.component';
import { AccountComponent } from './view/account/account.component';
import { RecorderService } from './services/recorder.service';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    StatisticsComponent,
    HomeComponent,
    SettingsComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [
    RecorderService,
  ]
})
export class DashboardModule {
}
