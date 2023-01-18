import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { BrowserModule } from '@angular/platform-browser';
import { PrivateRoutingModule } from './private-routing.module';
import { ComerceComponent } from './comerce/comerce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../core/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cart/cart.component';
import { PipesModule } from '../core/pipes/pipes.module';
import { ModulesModule } from '../core/modules/modules.module';



@NgModule({
  declarations: [
    PrivateComponent,
    ComerceComponent,
    CartComponent
    
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ModulesModule,
    ComponentsModule,
    FontAwesomeModule,
    PipesModule
  ]
})
export class PrivateModule { }
