import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from '@auth0/auth0-angular';
import {environment, environment as env} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {AUTH_NODE, authReducer} from './auth/store/auth.reducer';
import {SharedModule} from './shared/shared.module';
import {DASHBOARD_NODE, dashboardReducer} from './dashboard/store';

const reducers: ActionReducerMap<any> = {
  [AUTH_NODE]: authReducer,
  [DASHBOARD_NODE]: dashboardReducer,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(env.auth),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
