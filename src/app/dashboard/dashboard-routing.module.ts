import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'statistics',
        loadChildren: () => import('./view/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./view/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./view/account/account.module').then(m => m.AccountModule)
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
