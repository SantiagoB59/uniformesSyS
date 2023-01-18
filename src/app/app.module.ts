import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { ComponentsModule } from './core/components/components.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,

],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrivateModule,
    PublicModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
