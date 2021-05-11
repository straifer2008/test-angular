import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import {environment, environment as env} from '../environments/environment';
import {AuthFakeService} from './shared/services/auth-fake.service';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {reducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {UserEffects} from './reducers/user/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(env.auth),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [AuthFakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
