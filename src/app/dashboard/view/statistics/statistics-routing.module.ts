import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StatisticsComponent} from './statistics.component';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: StatisticsComponent}]),
  ]
})

export class StatisticsRoutingModule {}
