import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
