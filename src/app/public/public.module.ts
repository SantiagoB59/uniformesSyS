import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { BrowserModule } from '@angular/platform-browser';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {GalleriaModule} from 'primeng/galleria';
import { ComponentsModule } from '../core/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PipesModule } from '../core/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModulesModule } from '../core/modules/modules.module';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NuestrosHorariosComponent } from './nuestros-horarios/nuestros-horarios.component';
import { InformacionGeneralComponent } from './informacion-general/informacion-general.component';
import { TiemposDeEntregaComponent } from './tiempos-de-entrega/tiempos-de-entrega.component';
import { CalidadGarantiaComponent } from './calidad-garantia/calidad-garantia.component';
import { CambiosComponent } from './cambios/cambios.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { SearchComponent } from './search/search.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginRegisterComponent,
    SobreNosotrosComponent,
    NuestrosHorariosComponent,
    InformacionGeneralComponent,
    TiemposDeEntregaComponent,
    CalidadGarantiaComponent,
    CambiosComponent,
    FormasPagoComponent,
    SearchComponent,
    RegistroComponent,
    LoginComponent,
  ],
  imports: [
    GalleriaModule,
    CommonModule,
    PublicRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ModulesModule,
    ComponentsModule,
    FontAwesomeModule,
    PipesModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class PublicModule { }
