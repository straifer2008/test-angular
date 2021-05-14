import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './view/statistics/statistics.component';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './view/home/home.component';
import { SettingsComponent } from './view/settings/settings.component';
import { AccountComponent } from './view/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
