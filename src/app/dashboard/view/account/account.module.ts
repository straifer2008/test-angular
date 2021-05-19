import {NgModule} from '@angular/core';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    AccountRoutingModule,
  ]
})

export class AccountModule {}
