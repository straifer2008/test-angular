import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import {AuthFakeService} from './shared/services/auth-fake.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(env.auth),
    AppRoutingModule,
  ],
  providers: [AuthFakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
