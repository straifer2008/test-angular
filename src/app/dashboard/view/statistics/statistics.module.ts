import {NgModule} from '@angular/core';
import {StatisticsComponent} from './statistics.component';
import {StatisticsRoutingModule} from './statistics-routing.module';

@NgModule({
  declarations: [
    StatisticsComponent,
  ],
  imports: [
    StatisticsRoutingModule,
  ]
})

export class StatisticsModule {}
